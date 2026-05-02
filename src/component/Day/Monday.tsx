import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Modalcard from "../Modalcard";
import { update } from "../../Redux/Usermeal";

export default function Monday(props: {
  meal: unknown[];
  setCurrentItem?: (item: unknown) => void;
  currentItem?: unknown;
  sectionTitle?: string;
}) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [modalPayload, setModalPayload] = useState<unknown>(null);
  const [data, setdata] = useState(Array.isArray(props.meal) ? props.meal : []);

  useEffect(() => {
    setdata(Array.isArray(props.meal) ? props.meal : []);
  }, [props.meal]);

  function handlemodal(item: unknown): void {
    setModalPayload(item);
    props.setCurrentItem?.(item);
    setIsOpen(true);
  }

  function handledelete(index: number): void {
    const filterData = data.filter((_v, i) => i !== index);
    dispatch(update({ filterData }));
    setdata(filterData);
  }

  return (
    <>
      {props.sectionTitle ? <p className="meal-panel-meta">{props.sectionTitle}</p> : null}

      <div className="meal-cards-grid">
        {data.length === 0 ? (
          <div className="meal-empty meal-empty--span">
            <div className="meal-empty-icon" aria-hidden>
              🍽️
            </div>
            <h3 className="display-font">Nothing here yet</h3>
            <p>
              Add dishes from the home page meal section for this day and meal type. They will show up here as cards you
              can view or remove.
            </p>
          </div>
        ) : (
          data.map((item: any, i: number) => (
            <motion.article
              key={`${item?.title ?? "meal"}-${i}`}
              className="meal-card"
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: Math.min(i * 0.05, 0.35), ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="meal-card-image-wrap">
                <img className="meal-card-image" src={item?.image} alt="" />
              </div>
              <div className="meal-card-body">
                <h3 className="meal-card-title">{item?.title}</h3>
                <p className="meal-card-diets">{item?.diets ? String(item.diets) : "—"}</p>
                <div className="meal-card-actions">
                  <button type="button" className="meal-card-btn meal-card-btn--view" onClick={() => handlemodal(item)}>
                    View details
                  </button>
                  <button
                    type="button"
                    className="meal-card-btn meal-card-btn--remove"
                    title="Remove from list"
                    aria-label="Remove meal"
                    onClick={() => handledelete(i)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>

      {isOpen ? (
        <Modalcard currentItem={modalPayload ?? props.currentItem} isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : null}
    </>
  );
}

import React, { useState } from "react";
import styles from "./Modal.module.css";

import { useQuery, useMutation } from "@tanstack/react-query";

const STATUSES = [
  { id: "not_started", label: "Not Started" },
  { id: "in_progress", label: "In Progress" },
  { id: "complete", label: "Complete" },
];

const CreateWorkplanModal = ({ setIsOpen }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(STATUSES[0].id);

  const createWorkplanMutation = useMutation((data) => {
    return fetch("http://localhost:3000/workplans", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  });

  const createWorkplan = () => {
    const data = {
      name,
      workplan_category_id: category || categories[0].id,
      status,
    };
    console.log({ data });

    createWorkplanMutation.mutate(data);

    setIsOpen(false);
  };

  const {
    isLoading,
    error,
    data: categories,
  } = useQuery(["workplanCategories"], () =>
    fetch("http://localhost:3000/workplan_categories").then((res) => res.json())
  );

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Create new workplan</h5>
          </div>
          <div className={styles.modalContent}>
            <form>
              <div>
                <label>
                  Name:
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </label>
              </div>
              <div style={{ margin: "20px 0 0 0" }}>
                <label>
                  Category:
                  <select
                    value={category?.id}
                    onChange={(event) => {
                      setCategory(event.target.value);
                    }}
                  >
                    {!!categories &&
                      categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
              <div style={{ margin: "20px 0 0 0" }}>
                <label>
                  Status:
                  <select
                    value={status.id}
                    onChange={(event) => {
                      setStatus(event.target.value);
                    }}
                  >
                    {STATUSES.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </form>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              {!!categories && (
                <button className={styles.createBtn} onClick={createWorkplan}>
                  Create workplan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateWorkplanModal;

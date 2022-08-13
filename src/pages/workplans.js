import react, { useState } from "react";
import CreateWorkplan from "../modals/createWorkplan";
import { useQuery } from "@tanstack/react-query";

const WorkplanRow = (workplan) => {
  console.log({ workplan, anme: workplan.name });
  return <div>{workplan.workplan.name}</div>;
};

export default function Workplans() {
  const [showCreateWorkplanModal, setShowCreateWorkplanModal] = useState(false);

  const {
    isLoading,
    error,
    data: workplans,
  } = useQuery(["workplans"], () =>
    fetch("http://localhost:3000/workplans").then((res) => res.json())
  );
  console.log({ workplans, isLoading, error, len: workplans?.length });

  return (
    <main style={{ margin: "40px 80px", fontSize: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Workplans</p>
        <button
          onClick={() => {
            setShowCreateWorkplanModal(true);
          }}
        >
          New workplan
        </button>
      </div>
      <hr style={{ margin: "20px 0px" }} />

      {!!workplans && workplans?.length < 1 && <p>No workplans</p>}
      {!!workplans &&
        workplans.length > 0 &&
        workplans.map((workplan) => {
          return <WorkplanRow key={workplan.id} workplan={workplan} />;
        })}
      {showCreateWorkplanModal && (
        <CreateWorkplan setIsOpen={setShowCreateWorkplanModal} />
      )}
    </main>
  );
}

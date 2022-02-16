import { Callout, Spinner } from "@blueprintjs/core";
import React from "react";
import { Viewport } from "~src/Components/Viewport";
import { useAppSelector, RootState, useAppDispatch } from "~src/store";
import { setTotalWorkers } from ".";

export function SimWrapper({ children }: { children: React.ReactNode }) {
  const { ready, workers } = useAppSelector((state: RootState) => {
    return {
      ready: state.sim.ready,
      workers: state.sim.workers,
    };
  });
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setTotalWorkers(workers));
  }, []);

  if (ready === 0) {
    return (
      <Viewport>
        <Callout intent="primary" title="Loading simulator. Please wait">
          <Spinner />
        </Callout>
      </Viewport>
    );
  }
  return <div>{children}</div>;
}

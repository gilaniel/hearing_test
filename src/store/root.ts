import { makeAutoObservable } from "mobx";

export class RootStore {
  constructor() {
    makeAutoObservable(this);
  }

  step = 5;
  stats = {
    sex: undefined,
    age: undefined,
    left: {
      500: -80,
      1000: -80,
      2000: -80,
      4000: -80,
    },
    right: {
      500: -80,
      1000: -80,
      2000: -80,
      4000: -80,
    },
  } as {
    sex: string | undefined;
    age: number | undefined;
    left: {
      [key: number]: number;
    };
    right: {
      [key: number]: number;
    };
  };

  setStep = (step: number) => {
    this.step = step;
  };

  setStats = (channel: string, hz: number, value: number) => {
    this.stats = {
      ...this.stats,
      [channel]: { ...this.stats[channel], [hz]: value },
    };
  };

  setAge = (age: number) => {
    this.stats = { ...this.stats, age };
  };

  setSex = (sex: string) => {
    this.stats = { ...this.stats, sex };
  };
}

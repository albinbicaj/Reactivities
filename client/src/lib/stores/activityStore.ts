import { makeAutoObservable } from 'mobx';

export class ActivityStore {
  // Example observable state – expand as needed
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (state: boolean) => {
    this.loading = state;
  };
}

import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attributes";
import { Events } from "./Events";
import { Model } from "./Model";

export type TimerProps = {
  remainingTime: number;
  timerElement: Element | null;
  title: Element | null;
  timerInterval?: any;
};

export class Timer extends Model<TimerProps> {
  static build(attrs: TimerProps): Timer {
    return new Timer(
      new Attributes<TimerProps>(attrs),
      new Events(),
      new ApiSync("")
    );
  }

  onIntervalStart(): void {
    const timerEl = this.get("timerElement");
    const title = this.get("title");
    let remainingTime = this.get("remainingTime") as number;
    if (!timerEl || !title) {
      throw new Error("Timer or Title Error");
    }

    timerEl.prepend(title);
    let interval = setInterval(function () {
      timerEl.textContent = `Remaining Time: ${remainingTime}`;
      remainingTime--;
      if (remainingTime === -1) {
        clearInterval(interval);
      }
    }, 1000);

    this.setProp({ timerInterval: interval });

    setTimeout(() => {
      this.onStop();
    }, 8000);
  }

  onStart() {
    this.onIntervalStart();
  }

  onStop(): void {
    clearInterval(this.get("timerInterval"));
  }

  init() {
    this.onStart();
  }
}

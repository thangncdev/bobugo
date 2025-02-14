/* eslint-disable @typescript-eslint/no-explicit-any */
import { Subject } from 'rxjs';

export interface BaseEventType {
    type: string;
    payload?: any;
}

export interface BaseEvent<Payload> {
    type: string;
    payload?: Payload;
}

export default class EventBus {
    public static getInstance(): EventBus {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }

    private static instance: EventBus;

    private eventSubject = new Subject<BaseEventType>();

    public get events() {
        return this.eventSubject.asObservable();
    }

    public post<T extends BaseEventType>(event: T): void {
        this.eventSubject.next(event);
    }
}

export const onPushEventBus = <T>(type: string, payload?: T) => {
    EventBus.getInstance().post({ type, payload });
};

export const EventBusName = {
    // Watchlist
    CHANGE_WATCHLISTS: 'CHANGE_WATCHLISTS',

    // Alerts
    ADD_ALERT: 'ADD_ALERT',
    EDIT_ALERT: 'EDIT_ALERT',
    DELETE_ALERTS: 'DELETE_ALERTS',
    ACTIVATE_ALERTS: 'ACTIVATE_ALERTS',
    DEACTIVATE_ALERTS: 'DEACTIVATE_ALERTS',

    // Portfolio
    ADD_PORTFOLIO: 'ADD_PORTFOLIO',
    EDIT_PORTFOLIO: 'EDIT_PORTFOLIO',
    DELETE_PORTFOLIO: 'DELETE_PORTFOLIO',
}

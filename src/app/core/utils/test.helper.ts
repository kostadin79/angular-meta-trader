import {
  FactoryProvider,
  Optional
} from "@angular/core";
import { Action, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { AppState } from 'app-core/models/general-state';

function getAllElementTagsRecursively(el: Element) {
  const returnList: string[] = [];
  returnList.push(el.tagName);

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let index = 0; index < el.children.length; index++) {
    const cel = el.children[index];
    returnList.push(...getAllElementTagsRecursively(cel));
  }
  return returnList;
}
export function findAllCustomElements(el: HTMLElement): string[] {
  const returnList = [];
  const tagList = getAllElementTagsRecursively(el);

  for (const element of tagList) {
    const tagName = element.toLocaleLowerCase();
    if (!tagName.includes('-')) {
      continue;
    }
    returnList.push(tagName);
  }

  return returnList;
}

export abstract class StoreWithSnapshots {
  state: AppState;
  abstract dispatch(action: Action): void;
  abstract actionsArray(regex?: RegExp): Action[];
  abstract reset(): void;
}


export function provideStoreSnapshots(): FactoryProvider {
  const actionList: Action[] = [];
  function saveStore(store: StoreWithSnapshots & Store, actions: Actions) {
    store.subscribe(state => (store.state = state as AppState));
    if (actions) {
      actions.subscribe(action => {
        actionList.push(action);
      });
    }
    store.actionsArray = (regex = /.*/) => actionList.filter(action => regex.test(action.type));
    store.reset = () => actionList.splice(0, actionList.length);
    return store;
  }

  return {
    provide: StoreWithSnapshots,
    useFactory: saveStore,
    deps: [Store, [new Optional(), Actions]],
  };
}


import * as openPosition from 'app-core/store/actions/open-position.actions';
import { anything } from 'ts-mockito';


describe('Open Positions actions', () => {
  it('should return an action [OpenPosition/API] Get Initial Open Position Data', () => {
    expect(openPosition.initialOpenPositionsLoad().type).toBe(
      '[OpenPosition/API] Get Initial Open Position Data'
    );
  });

  it('should return an action [OpenPosition/API] Get Initial Open Position Data Success', () => {
    expect(openPosition.initialOpenPositionsLoadSuccess(anything()).type).toBe(
      '[OpenPosition/API] Get Initial Open Position Data Success'
    );
  });

  it('should return an action [OpenPosition/API] Start Open Position Stream', () => {
    expect(openPosition.startOpenPositionsStream().type).toBe(
      '[OpenPosition/API] Start Open Position Stream'
    );
  });

  it('should return an action [OpenPosition/API] Update Open Position From Stream Success', () => {
    expect(
      openPosition.updateOpenPositionsFromStreamSuccess(anything()).type
    ).toBe('[OpenPosition/API] Update Open Position From Stream Success');
  });

  it('should return an action [OpenPosition/API] Load OpenPositions', () => {
    expect(openPosition.loadOpenPositions(anything()).type).toBe(
      '[OpenPosition/API] Load OpenPositions'
    );
  });

  it('should return an action [OpenPosition/API] Add OpenPosition', () => {
    expect(openPosition.addOpenPosition(anything()).type).toBe(
      '[OpenPosition/API] Add OpenPosition'
    );
  });
  it('should return an action [OpenPosition/API] Upsert OpenPosition', () => {
    expect(openPosition.upsertOpenPosition(anything()).type).toBe(
      '[OpenPosition/API] Upsert OpenPosition'
    );
  });

  it('should return an action [OpenPosition/API] Add OpenPositions', () => {
    expect(openPosition.addOpenPositions(anything()).type).toBe(
      '[OpenPosition/API] Add OpenPositions'
    );
  });
  it('should return an action [OpenPosition/API] Upsert OpenPositions', () => {
    expect(openPosition.upsertOpenPositions(anything()).type).toBe(
      '[OpenPosition/API] Upsert OpenPositions'
    );
  });

  it('should return an action [OpenPosition/API] Update OpenPosition', () => {
    expect(openPosition.updateOpenPosition(anything()).type).toBe(
      '[OpenPosition/API] Update OpenPosition'
    );
  });

  it('should return an action [OpenPosition/API] Update OpenPositions', () => {
    expect(openPosition.updateOpenPositions(anything()).type).toBe(
      '[OpenPosition/API] Update OpenPositions'
    );
  });
  it('should return an action [OpenPosition/API] Delete OpenPosition', () => {
    expect(openPosition.deleteOpenPosition(anything()).type).toBe(
      '[OpenPosition/API] Delete OpenPosition'
    );
  });

  it('should return an action [OpenPosition/API] Delete OpenPositions', () => {
    expect(openPosition.deleteOpenPositions(anything()).type).toBe(
      '[OpenPosition/API] Delete OpenPositions'
    );
  });

  it('should return an action [OpenPosition/API] Clear OpenPositions', () => {
    expect(openPosition.clearOpenPositions().type).toBe(
      '[OpenPosition/API] Clear OpenPositions'
    );
  });
});



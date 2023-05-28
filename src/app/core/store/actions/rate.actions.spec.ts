import * as rate from 'app-core/store/actions/rate.actions';
import { anything } from 'ts-mockito';

describe('Rate actions', () => {
  it('should return an action [Rate/API] Get Initial Rates Data', () => {
    expect(rate.initialRatesLoad().type).toBe(
      '[Rate/API] Get Initial Rates Data'
    );
  });

  it('should return an action [Rate/API] Get Initial Rates Data Success', () => {
    expect(rate.initialRatesLoadSuccess(anything()).type).toBe(
      '[Rate/API] Get Initial Rates Data Success'
    );
  });

  it('should return an action [Rate/API] Start Rates Stream', () => {
    expect(rate.startRatesStream().type).toBe('[Rate/API] Start Rates Stream');
  });

  it('should return an action [Rate/API] Update Rates From Stream Success', () => {
    expect(rate.updateRatesFromStreamSuccess(anything()).type).toBe(
      '[Rate/API] Update Rates From Stream Success'
    );
  });

  it('should return an action [Rate/API] Load Rates', () => {
    expect(rate.loadRates(anything()).type).toBe('[Rate/API] Load Rates');
  });

  it('should return an action [Rate/API] Add Rate', () => {
    expect(rate.addRate(anything()).type).toBe('[Rate/API] Add Rate');
  });

  it('should return an action [Rate/API] Upsert Rate', () => {
    expect(rate.upsertRate(anything()).type).toBe('[Rate/API] Upsert Rate');
  });

  it('should return an action [Rate/API] Add Rates', () => {
    expect(rate.addRates(anything()).type).toBe('[Rate/API] Add Rates');
  });

  it('should return an action [Rate/API] Upsert Rates', () => {
    expect(rate.upsertRates(anything()).type).toBe('[Rate/API] Upsert Rates');
  });

  it('should return an action [Rate/API] Update Rate', () => {
    expect(rate.updateRate(anything()).type).toBe('[Rate/API] Update Rate');
  });

  it('should return an action [Rate/API] Update Rates', () => {
    expect(rate.updateRates(anything()).type).toBe('[Rate/API] Update Rates');
  });

  it('should return an action [Rate/API] Delete Rate', () => {
    expect(rate.deleteRate(anything()).type).toBe('[Rate/API] Delete Rate');
  });

  it('should return an action [Rate/API] Delete Rates', () => {
    expect(rate.deleteRates(anything()).type).toBe('[Rate/API] Delete Rates');
  });

  it('should return an action [Rate/API] Clear Rates', () => {
    expect(rate.clearRates().type).toBe('[Rate/API] Clear Rates');
  });

});


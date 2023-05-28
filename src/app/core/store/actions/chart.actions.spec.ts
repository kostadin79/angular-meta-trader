import * as chart from 'app-core/store/actions/chart.actions';
import { anything } from 'ts-mockito';

describe('Chart actions', () => {
  it('should return an action [Chart/API] Get Chart', () => {
    expect(chart.getChart(anything()).type).toBe('[Chart/API] Get Chart');
  });

  it('should return an action [Chart/API] Get Chart Success', () => {
    expect(chart.getChartSuccess(anything()).type).toBe(
      '[Chart/API] Get Chart Success'
    );
  });

  it('should return an action [Chart/API] Load Charts', () => {
    expect(chart.loadCharts(anything()).type).toBe('[Chart/API] Load Charts');
  });

  it('should return an action [Chart/API] Add Chart', () => {
    expect(chart.addChart(anything()).type).toBe('[Chart/API] Add Chart');
  });

  it('should return an action [Chart/API] Upsert Chart', () => {
    expect(chart.upsertChart(anything()).type).toBe('[Chart/API] Upsert Chart');
  });

  it('should return an action [Chart/API] Add Charts', () => {
    expect(chart.addCharts(anything()).type).toBe('[Chart/API] Add Charts');
  });

  it('should return an action [Chart/API] Upsert Charts', () => {
    expect(chart.upsertCharts(anything()).type).toBe('[Chart/API] Upsert Charts');
  });

  it('should return an action [Chart/API] Update Chart', () => {
    expect(chart.updateChart(anything()).type).toBe('[Chart/API] Update Chart');
  });

  it('should return an action [Chart/API] Update Charts', () => {
    expect(chart.updateCharts(anything()).type).toBe('[Chart/API] Update Charts');
  });

  it('should return an action [Chart/API] Delete Chart', () => {
    expect(chart.deleteChart(anything()).type).toBe('[Chart/API] Delete Chart');
  });

  it('should return an action [Chart/API] Delete Charts', () => {
    expect(chart.deleteCharts(anything()).type).toBe('[Chart/API] Delete Charts');
  });

  it('should return an action [Chart/API] Clear Charts', () => {
    expect(chart.clearCharts().type).toBe('[Chart/API] Clear Charts');
  });

});



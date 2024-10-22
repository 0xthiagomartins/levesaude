import { getAgendas } from '../agendaService';

describe('Agenda Service', () => {
    it('should return a list of medicos with agendas', () => {
        const result = getAgendas();
        expect(result).toHaveProperty('medicos');
        expect(result.medicos.length).toBeGreaterThan(0);
    });
});

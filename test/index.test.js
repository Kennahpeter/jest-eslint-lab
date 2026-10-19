const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('capitalizeWords', () => {
    test('capitalizes the first letter of each word', () => {
        expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('handles an empty string', () => {
        expect(capitalizeWords('')).toBe('');
    });

    test('handles words with special characters (hyphens)', () => {
        expect(capitalizeWords('hello-world')).toBe('Hello-World');
    });

    test('handles a single word', () => {
        expect(capitalizeWords('hello')).toBe('Hello');
    });

    test('leaves already capitalized words unchanged', () => {
        expect(capitalizeWords('Hello World')).toBe('Hello World');
    });
});

describe('filterActiveUsers', () => {
    test('returns only active users from a mixed array', () => {
        const users = [
            { name: 'Alice', isActive: true },
            { name: 'Bob', isActive: false },
        ];
        expect(filterActiveUsers(users)).toEqual([{ name: 'Alice', isActive: true }]);
    });

    test('returns an empty array when all users are inactive', () => {
        const users = [
            { name: 'Alice', isActive: false },
            { name: 'Bob', isActive: false },
        ];
        expect(filterActiveUsers(users)).toEqual([]);
    });

    test('returns an empty array when given an empty array', () => {
        expect(filterActiveUsers([])).toEqual([]);
    });
});

describe('logAction', () => {
    test('generates the correct log message', () => {
        const result = logAction('login', 'Alice');
        expect(result).toMatch(/^User Alice performed login at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    test('handles a missing action', () => {
        expect(logAction(undefined, 'Alice')).toMatch(/^User Alice performed undefined at /);
    });

    test('handles a missing username', () => {
        expect(logAction('login', undefined)).toMatch(/^User undefined performed login at /);
    });

    test('handles empty strings', () => {
        expect(logAction('', '')).toContain('User  performed  at ');
    });
});

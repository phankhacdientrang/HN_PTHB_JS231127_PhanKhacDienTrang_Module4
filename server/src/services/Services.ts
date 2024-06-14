import db from '../connection/Connection';

export const findAdd = async () => {
    const [rows] = await db.query('SELECT * FROM tasks');
    return rows;
};

export const findOne = async (id: number) => {
    const [rows] = await db.query(`SELECT * FROM tasks WHERE id = ?`, [id]);
    return rows;
};

export const createTask = async (name: string, status: boolean) => {
    const result = await db.query('INSERT INTO tasks (name, status) VALUES (?, ?)', [name, status]);
    return result;
};

export const updateTask = async (id: number, name: string, status: boolean) => {
    const result = await db.query('UPDATE tasks SET name = ?, status = ? WHERE id = ?', [name, status, id]);
    return result;
};

export const deleteTask = async (id: number) => {
    const result = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    return result;
};

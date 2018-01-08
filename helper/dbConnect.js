import promiseMysql from 'promise-mysql';

const pool = promiseMysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT,
  connectionLimit: 10,
});

const connect = async (fn) => {
  /* DB 커넥션을 한다. */
  const con = await pool.getConnection();
  /* 로직에 con과 args(넘겨받은 paramter)를 넘겨준다. */
  const result = await fn(con).catch((error) => {
    /* 에러시 con을 닫아준다. */
    con.connection.release();
    throw error;
  });
  /* con을 닫아준다. */
  con.connection.release();
  return result;
};

const transaction = fn => async (...args) => {
  /* DB 커넥션을 한다. */
  const con = await pool.getConnection();
  /* 트렌젝션 시작 */
  await con.connection.beginTransaction();
  /* 비지니스 로직에 con을 넘겨준다. */
  const result = await fn(con, ...args).catch(async (error) => {
    /* rollback을 진행한다. */
    await con.rollback();
    /* 에러시 con을 닫아준다. */
    con.connection.release();
    throw error;
  });
  /* commit을 해준다. */
  await con.commit();
  /* con을 닫아준다. */
  con.connection.release();
  return result;
};

export default {
  connect,
  transaction,
};

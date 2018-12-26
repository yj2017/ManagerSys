package com.ymlyj666.onlinechat.dao;

import com.ymlyj666.onlinechat.model.User;
import com.ymlyj666.onlinechat.util.CommonUtils;
import com.ymlyj666.onlinechat.util.UUID;
import org.apache.commons.codec.digest.DigestUtils;

import java.io.IOException;
import java.sql.*;
import java.util.List;

public class UserDao extends AbstractDao<User, String> {
    private static final String TABLE_NAME = "tb_user";
    private static final String SQL_INSERT = "INSERT INTO " + TABLE_NAME + " VALUES (?,?,?,?)";
    private static final String SQL_UPDATE = "UPDATE " + TABLE_NAME + " SET username = ? , password = ? WHERE uid = ?";
    private static final String SQL_FIND_ONE = "SELECT * FROM " + TABLE_NAME + " WHERE uid = ?";
    private static final String SQL_FIND_ALL = "SELECT * FROM " + TABLE_NAME;
    private static final String SQL_DELETE = "DELETE FROM " + TABLE_NAME + " WHERE uid = ?";

    private static final String SQL_FIND_BY_USERNAME = "SELECT * FROM " + TABLE_NAME + " WHERE username = ?";

    public User findByUsername(String username) {
        return execute(new SingleQueryAction() {
            @Override
            public String getSQL() {
                return SQL_FIND_BY_USERNAME;
            }

            @Override
            public void setParams(PreparedStatement statement) throws SQLException {
                statement.setString(1, username);
            }
        });
    }

    public List<User> findByUsernameLike(String username) {
        List<User> users = execute(new MultiQueryAction() {
            @Override
            public String getSQL() {
                return "select * from " + TABLE_NAME + " where username like ?";
            }

            @Override
            public void setParams(PreparedStatement statement) throws SQLException {
                statement.setString(1, "%" + username + "%");
            }
        });
        users.forEach(user -> user.setPassword(""));
        return users;
    }

    @Override
    public User save(User user) {
        execute(new UpdateAction() {
            @Override
            public String getSQL() {
                if (user.getUid() == null) {
                    return SQL_INSERT;
                } else {
                    return SQL_UPDATE;
                }
            }

            @Override
            public void setParams(PreparedStatement statement) throws SQLException {
                if (user.getUid() == null) {
                    String uuid = UUID.randomUUID().toString();
                    user.setUid(uuid);
                    user.setPassword(CommonUtils.encryptPassword(uuid, user.getPassword()));
                    user.setRegisterTime(System.currentTimeMillis());

                    statement.setString(1, user.getUid());
                    statement.setString(2, user.getUsername());
                    statement.setString(3, user.getPassword());
                    statement.setLong(4, user.getRegisterTime());
                } else {
                    statement.setString(1, user.getUsername());
                    statement.setString(2, user.getPassword());
                    statement.setString(3, user.getUid());
                }
            }
        });
        return findOne(user.getUid());
    }

    @Override
    public int delete(User user) {
        return delete(user.getUid());
    }

    @Override
    public int delete(String s) {
        return (int) execute(new UpdateAction() {
            @Override
            public String getSQL() {
                return SQL_DELETE;
            }

            @Override
            public void setParams(PreparedStatement statement) throws SQLException {
                statement.setString(1, s);
            }
        });
    }

    @Override
    public User findOne(String s) {
        return execute(new SingleQueryAction() {
            @Override
            public String getSQL() {
                return SQL_FIND_ONE;
            }

            @Override
            public void setParams(PreparedStatement statement) throws SQLException {
                statement.setString(1, s);
            }
        });
    }

    @Override
    public List<User> findAll() {
        return execute(() -> SQL_FIND_ALL);
    }


//    @Override
//    protected PreparedStatement findOneStatement(Connection connection, String s) throws SQLException {
//        PreparedStatement statement = connection.prepareStatement(SQL_FIND_ONE);
//        statement.setString(1, s);
//        return statement;
//    }
//
//    @Override
//    protected PreparedStatement findAllStatement(Connection connection) throws SQLException {
//        return connection.prepareStatement(SQL_FIND_ALL);
//    }
//
//    @Override
//    protected PreparedStatement deleteStatement(Connection connection, String s) throws SQLException {
//        PreparedStatement statement = connection.prepareStatement(SQL_DELETE);
//        statement.setString(1, s);
//        return statement;
//    }

    @Override
    protected User transform(ResultSet resultSet) throws SQLException {
        User user = new User();
        user.setUid(resultSet.getString("uid"));
        user.setUsername(resultSet.getString("username"));
        user.setPassword(resultSet.getString("password"));
        user.setRegisterTime(resultSet.getLong("register_time"));
        return user;
    }

}

package com.ymlyj666.onlinechat.dao;

import java.io.Serializable;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public abstract class AbstractDao<Model, ID extends Serializable> implements BaseDao<Model, ID>, AutoCloseable {
    private Connection connection = null;

    protected abstract Model transform(ResultSet resultSet) throws SQLException;

    @SuppressWarnings("unchecked")
    protected final <Result> Result execute(DBAction action) {
        Connection connection = getConnection();
        try (PreparedStatement statement = connection.prepareStatement(action.getSQL())) {
            action.setParams(statement);
            if (action instanceof QueryAction) {
                try (ResultSet resultSet = statement.executeQuery()) {
                    if (action instanceof SingleQueryAction) {
                        if (resultSet.next()) {
                            return (Result) transform(resultSet);
                        }
                    } else if (action instanceof MultiQueryAction) {
                        List models = new ArrayList<>();
                        while (resultSet.next()) {
                            models.add(transform(resultSet));
                        }
                        return (Result) models;
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            } else if (action instanceof UpdateAction) {
                return (Result) (Object) statement.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Connection getConnection() {
        try {
            if (connection == null || connection.isClosed()) {
                synchronized (this) {
                    if (connection == null || connection.isClosed()) {
                        String dbUrl = "jdbc:mysql://localhost:3306/db_716chat?characterEncoding=utf8&useSSL=true&serverTimezone=GMT%2b8";
                        connection = DriverManager.getConnection(dbUrl, "chat", "123456");
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }

    @Override
    public void close() throws Exception {
        if (connection != null && !connection.isClosed()) {
            synchronized (this) {
                if (connection != null && !connection.isClosed()) {
                    connection.close();
                }
            }
        }
    }

    @Override
    protected void finalize() throws Throwable {
        close();
        super.finalize();
    }

    protected interface DBAction {
        String getSQL();

        default void setParams(PreparedStatement statement) throws SQLException {
        }
    }

    private interface QueryAction extends DBAction {
        //不允许直接实现QueryAction
    }

    interface SingleQueryAction extends QueryAction {
    }

    interface MultiQueryAction extends QueryAction {
    }

    interface UpdateAction extends DBAction {
    }

}

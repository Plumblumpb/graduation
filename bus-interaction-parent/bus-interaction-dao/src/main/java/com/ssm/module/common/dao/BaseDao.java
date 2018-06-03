package com.ssm.module.common.dao;

import java.util.List;
import java.util.Map;

/**
 * @author TheOne
 * @create 2017-12-2017/12/19 10:50
 */
public interface BaseDao<T> {

    /**
     * 新增
     *
     * @param t
     */
    void save(T t);

    /**
     * 新增
     *
     * @param map
     */
    void save(Map<String, Object> map);

    /**
     * 批量新增
     *
     * @param list
     */
    void saveBatch(List<T> list);

    /**
     * 更新
     *
     * @param t
     * @return
     */
    int update(T t);

    /**
     * 更新
     *
     * @param map
     * @return
     */
    int update(Map<String, Object> map);

    /**
     * 删除
     *
     * @param id
     * @return
     */
    int delete(Object id);

    /**
     * 删除
     *
     * @param map
     * @return
     */
    int delete(Map<String, Object> map);

    /**
     * 删除
     *
     * @param id
     * @return
     */
    int deleteBatch(Object[] id);

    int deleteBatchRole(Object[] id);

    /**
     * 查询单个
     *
     * @param id
     * @return
     */
    T queryObject(Object id);

    /**
     * 查询列表
     *
     * @param map
     * @return
     */
    List<T> queryList(Map<String, Object> map);
}

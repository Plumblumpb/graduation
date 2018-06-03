package com.ssm.module.sys.service;

import com.ssm.module.sys.entity.SysDeptEntity;

import java.util.List;
import java.util.Map;

/**
 * 部门管理
 *
 * @author TheOne
 */
public interface SysDeptService {

    /**
     * 根据部门ID获取部门信息
     *
     * @param deptId 部门ID
     * @return 部门信息
     */
    SysDeptEntity queryObject(Long deptId);

    /**
     * 查询部门信息列表
     *
     * @param map 查询条件
     * @return 部门信息列表
     */
    List<SysDeptEntity> queryList(Map<String, Object> map);

    /**
     * 新增部门信息
     *
     * @param sysDept 部门信息
     */
    void save(SysDeptEntity sysDept);

    /**
     * 更新部门信息
     *
     * @param sysDept 部门新
     */
    void update(SysDeptEntity sysDept);

    /**
     * 根据部门ID删除部门信息
     *
     * @param deptId 部门ID
     */
    void delete(Long deptId);

    void deleteBatch(Long[] deptIds);

    /**
     * 查询子部门ID列表
     *
     * @param parentId 上级部门ID
     * @return 子部门ID列表
     */
    List<Long> queryDetpIdList(Long parentId);

    /**
     * 获取子部门ID(包含本部门ID)，用于数据过滤
     *
     * @param deptId 部门ID
     * @return 子部门ID
     */
    String getSubDeptIdList(Long deptId);

}

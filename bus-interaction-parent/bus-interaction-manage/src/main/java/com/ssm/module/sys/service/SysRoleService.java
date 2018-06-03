package com.ssm.module.sys.service;

import com.ssm.module.sys.entity.SysRoleEntity;

import java.util.List;
import java.util.Map;


/**
 * 角色service接口
 *
 * @author TheOne
 */
public interface SysRoleService {

    /**
     * 根据角色ID，查询角色信息
     *
     * @param roleId 角色ID
     * @return 角色信息
     */
    SysRoleEntity queryObject(Long roleId);

    /**
     * 查询角色列表
     *
     * @param map 查询条件
     * @return 角色列表
     */
    List<SysRoleEntity> queryList(Map<String, Object> map);

    /**
     * 新增角色
     *
     * @param role 角色信息
     */
    void save(SysRoleEntity role);

    /**
     * 修改角色
     *
     * @param role 角色信息
     */
    void update(SysRoleEntity role);

    /**
     * 批量删除角色
     *
     * @param roleIds 角色ID数组
     */
    void deleteBatch(Long[] roleIds);

}

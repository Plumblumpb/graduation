package com.ssm.module.sys.service;

import java.util.List;


/**
 * 角色与部门对应关系
 *
 * @author TheOne
 */
public interface SysRoleDeptService {

    /**
     * 新增或修改角色部门关系
     *
     * @param roleId     角色ID
     * @param deptIdList 部门列表
     */
    void saveOrUpdate(Long roleId, List<Long> deptIdList);

    /**
     * 根据角色ID，获取部门ID列表
     *
     * @param roleId 角色ID
     * @return 部门ID列表
     */
    List<Long> queryDeptIdList(Long roleId);

}

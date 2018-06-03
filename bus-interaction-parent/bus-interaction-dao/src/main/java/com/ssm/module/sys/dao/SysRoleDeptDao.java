package com.ssm.module.sys.dao;

import com.ssm.module.common.dao.BaseDao;
import com.ssm.module.sys.entity.SysRoleDeptEntity;

import java.util.List;

/**
 * 角色与部门对应关系
 *
 * @author TheOne
 */
public interface SysRoleDeptDao extends BaseDao<SysRoleDeptEntity> {

    /**
     * 根据角色ID，获取部门ID列表
     *
     * @param roleId 角色ID
     * @return 部门ID列表
     */
    List<Long> queryDeptIdList(Long roleId);
}

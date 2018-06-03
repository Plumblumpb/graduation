package com.ssm.module.sys.dao;


import com.ssm.module.common.dao.BaseDao;
import com.ssm.module.sys.entity.SysRoleEntity;

/**
 * 角色管理
 *
 * @author TheOne
 */
public interface SysRoleDao extends BaseDao<SysRoleEntity> {
    int deleteBatch(Object[] id);

    int deleteBatchMenu(Object[] id);

    int deleteBatchDept(Object[] id);

    int deleteBatchRole(Object[] id);
}

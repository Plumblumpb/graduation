package com.ssm.module.sys.dao;

import com.ssm.module.common.dao.BaseDao;
import com.ssm.module.sys.entity.SysUserRoleEntity;

import java.util.List;

/**
 * 用户与角色对应关系数据库操作接口
 *
 * @author TheOne
 */
public interface SysUserRoleDao extends BaseDao<SysUserRoleEntity> {

    /**
     * 根据用户ID，获取角色ID列表
     *
     * @param userId 用户ID
     * @return 角色ID列表
     */
    List<Long> queryRoleIdList(Long userId);
}

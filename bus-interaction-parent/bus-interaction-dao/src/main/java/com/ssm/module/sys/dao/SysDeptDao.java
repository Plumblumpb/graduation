package com.ssm.module.sys.dao;


import com.ssm.module.common.dao.BaseDao;
import com.ssm.module.sys.entity.SysDeptEntity;

import java.util.List;

/**
 * 部门信息数据库操作接口
 *
 * @author TheOne
 */
public interface SysDeptDao extends BaseDao<SysDeptEntity> {

    /**
     * 查询子部门ID列表
     *
     * @param parentId 上级部门ID
     * @return 子部门ID列表
     */
    List<Long> queryDetpIdList(Long parentId);
}

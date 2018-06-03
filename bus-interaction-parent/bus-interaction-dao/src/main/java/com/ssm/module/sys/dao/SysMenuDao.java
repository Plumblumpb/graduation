package com.ssm.module.sys.dao;

import com.ssm.module.common.dao.BaseDao;
import com.ssm.module.sys.entity.SysMenuEntity;

import java.util.List;

/**
 * 菜单管理
 *
 * @author TheOne
 */
public interface SysMenuDao extends BaseDao<SysMenuEntity> {

    /**
     * 根据父菜单，查询子菜单
     *
     * @param parentId 父菜单ID
     * @return 子菜单列表
     */
    List<SysMenuEntity> queryListParentId(Long parentId);

    /**
     * 获取不包含按钮的菜单列表
     *
     * @return 菜单列表
     */
    List<SysMenuEntity> queryNotButtonList();

    /**
     * 查询用户的权限列表
     *
     * @param userId 用户ID
     * @return 权限列表
     */
    List<SysMenuEntity> queryUserList(Long userId);

}

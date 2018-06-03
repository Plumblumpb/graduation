package com.ssm.module.sys.service;

import com.ssm.module.sys.entity.SysMenuEntity;

import java.util.List;
import java.util.Map;


/**
 * 菜单管理
 *
 * @author TheOne
 */
public interface SysMenuService {

    /**
     * 根据父菜单，查询子菜单
     *
     * @param parentId   父菜单ID
     * @param menuIdList 用户菜单ID
     * @return 子菜单列表
     */
    List<SysMenuEntity> queryListParentId(Long parentId, List<Long> menuIdList);

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
     * 获取用户菜单列表
     *
     * @param userId 用户ID
     * @return 菜单列表
     */
    List<SysMenuEntity> getUserMenuList(Long userId);

    /**
     * 查询菜单
     *
     * @param menuId 菜单ID
     * @return 菜单信息
     */
    SysMenuEntity queryObject(Long menuId);

    /**
     * 查询菜单列表
     *
     * @param map 查询条件
     * @return 菜单列表
     */
    List<SysMenuEntity> queryList(Map<String, Object> map);

    /**
     * 保存菜单
     *
     * @param menu 菜单信息
     */
    void save(SysMenuEntity menu);

    /**
     * 修改
     *
     * @param menu 菜单信息
     */
    void update(SysMenuEntity menu);

    /**
     * 删除
     *
     * @param menuIds 菜单ID数组
     */
    void deleteBatch(Long[] menuIds);

    /**
     * 查询用户的权限列表
     *
     * @param userId 用户ID
     * @return 菜单列表
     */
    List<SysMenuEntity> queryUserList(Long userId);
}

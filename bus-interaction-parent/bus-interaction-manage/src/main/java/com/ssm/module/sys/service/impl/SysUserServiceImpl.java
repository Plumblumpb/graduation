package com.ssm.module.sys.service.impl;

import com.ssm.module.common.util.ShiroUtil;
import com.ssm.module.sys.dao.SysMenuDao;
import com.ssm.module.sys.dao.SysUserDao;
import com.ssm.module.sys.entity.SysMenuEntity;
import com.ssm.module.sys.entity.SysUserEntity;
import com.ssm.module.sys.service.SysUserRoleService;
import com.ssm.module.sys.service.SysUserService;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


/**
 * 系统用户
 *
 * @author TheOne
 */
@Service("sysUserService")
public class SysUserServiceImpl implements SysUserService {

    @Autowired
    private SysUserDao sysUserDao;

    @Autowired
    private SysMenuDao sysMenuDao;

    @Autowired
    private SysUserRoleService sysUserRoleService;

    @Override
    public List<String> queryAllPerms(Long userId) {
        List<Long> menuIdList = listUserMenuIds(userId);
        return sysUserDao.queryPermsByMenuId(menuIdList);
    }

    @Override
    public List<Long> queryAllMenuId(Long userId) {
        return sysUserDao.queryAllMenuId(userId);
    }

    @Override
    public SysUserEntity queryByUserName(String username) {
        return sysUserDao.queryByUserName(username);
    }

    @Override
    public SysUserEntity queryObject(Long userId) {
        return sysUserDao.queryObject(userId);
    }

    @Override
    public List<SysUserEntity> queryList(Map<String, Object> map) {
        return sysUserDao.queryList(map);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void save(SysUserEntity user) {
        user.setCreateTime(new Date());
        //sha256加密
        String salt = RandomStringUtils.randomAlphanumeric(20);
        user.setSalt(salt);
        user.setPassword(ShiroUtil.sha256(user.getPassword(), user.getSalt()));
        sysUserDao.save(user);

        //保存用户与角色关系
        sysUserRoleService.saveOrUpdate(user.getUserId(), user.getRoleIdList());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(SysUserEntity user) {
        if (StringUtils.isBlank(user.getPassword())) {
            user.setPassword(null);
        } else {
            user.setPassword(ShiroUtil.sha256(user.getPassword(), user.getSalt()));
        }
        sysUserDao.update(user);

        //保存用户与角色关系
        sysUserRoleService.saveOrUpdate(user.getUserId(), user.getRoleIdList());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteBatch(Long[] userId) {
        for (int i = 0; i < userId.length; i++) {
            sysUserDao.delete(userId[i]);
        }

    }

    @Override
    public int updatePassword(Long userId, String password, String newPassword) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("password", password);
        map.put("newPassword", newPassword);
        return sysUserDao.updatePassword(map);
    }

    @Override
    public List<Long> listUserMenuIds(Long userId) {
        List<SysMenuEntity> sysMenuEntityList = sysMenuDao.queryUserList(userId);
        // 查询回来所有的菜单，由于父菜单可能是部门选中，此时不会保存记录
        Set<Long> menuIdSet = new HashSet<>();
        for (SysMenuEntity sysMenuEntity : sysMenuEntityList) {
            menuIdSet.add(sysMenuEntity.getMenuId());
        }
        for (SysMenuEntity sysMenuEntity : sysMenuEntityList) {
            if (sysMenuEntity.getParentId() == null || sysMenuEntity.getParentId() == 0) {
                continue;
            }
            menuIdSet = fillParentId(menuIdSet, sysMenuEntity.getParentId());
        }
        if (menuIdSet.size() > 0) {
            List<Long> menuIdList = new ArrayList<>(menuIdSet);
            return menuIdList;
        }
        return null;
    }

    @Override
    public void deleteSysuserrole(Long[] id) {
        for (int i = 0; i < id.length; i++) {
            sysUserDao.deleteSysuser((Long) id[i]);
            sysUserDao.deleteSysuserrole(id[i]);
        }
    }

    @Override
    public void deleteSysuser(Long[] id) {

    }

    private Set<Long> fillParentId(Set<Long> menuIdSet, Long parentId) {
        if (parentId == 0 || menuIdSet.contains(parentId)) {
            return menuIdSet;
        } else {
            SysMenuEntity sysMenuEntity = sysMenuDao.queryObject(parentId);
            menuIdSet.add(parentId);
            menuIdSet = fillParentId(menuIdSet, sysMenuEntity.getParentId());
        }
        return menuIdSet;
    }

}

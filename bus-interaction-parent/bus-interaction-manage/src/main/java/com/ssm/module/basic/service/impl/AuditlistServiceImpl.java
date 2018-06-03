package com.ssm.module.basic.service.impl;

import com.ssm.module.basic.service.AuditlistService;
import com.ssm.module.note.dao.AuditlistDao;
import com.ssm.module.note.tool.NoteCarTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("auditlistService")
public class AuditlistServiceImpl implements AuditlistService {
    @Autowired
    private AuditlistDao auditlistDao;

    @Override
    public List<NoteCarTools> getAll(Map<String, Object> map) {
        return auditlistDao.getAll(map);
    }

    @Override
    public int save(NoteCarTools noteCarTools) {
        return auditlistDao.save(noteCarTools);
    }

    @Override
    public int update(NoteCarTools noteCarTools) {
        return 0;
    }

    @Override
    public int delete(int[] id) {
        for (int i = 0; i < id.length; i++) {
            auditlistDao.delete(id[i]);
        }
        return 1;
    }

    @Override
    public NoteCarTools selectOne(int id) {
        return auditlistDao.selectOne(id);
    }

    @Override
    public List<NoteCarTools> selectBySelective(Map<String, Object> map) {
        return auditlistDao.selectBySelective(map);
    }

    @Override
    public void updateStatus(int[] id) {

        for (int i = 0; i < id.length; i++) {
            auditlistDao.updateStatus(id[i]);
        }
    }

    @Override
    public void returnStatus(Map<String, Object> map) {

        auditlistDao.returnStatus(map);


    }
}

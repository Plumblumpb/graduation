package com.ssm.module.basic.service.impl;

import com.ssm.module.basic.service.ArrangecarService;
import com.ssm.module.note.dao.ArrangecarDao;
import com.ssm.module.note.tool.NoteCarTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("arrangecarService")
public class ArrangecarServiceImpl implements ArrangecarService {
    @Autowired
    private ArrangecarDao arrangecarDao;

    @Override
    public List<NoteCarTools> getAll(Map<String, Object> map) {
        return arrangecarDao.getAll(map);
    }

    @Override
    public int save(NoteCarTools noteCarTools) {
        return 1;
    }

    @Override
    public int update(NoteCarTools noteCarTools) {
        return 1;
    }

    @Override
    public int delete(int[] id) {
        for (int i = 0; i < id.length; i++) {
            arrangecarDao.delete(id[i]);
        }
        return 1;
    }

    @Override
    public NoteCarTools selectOne(int id) {
        return arrangecarDao.selectOne(id);
    }

    @Override
    public List<NoteCarTools> selectBySelective(Map<String, Object> map) {
        return arrangecarDao.selectBySelective(map);
    }

    @Override
    public void updateStatus(int[] id) {
        for (int i = 0; i < id.length; i++) {
            arrangecarDao.updateStatus(id[i]);
        }
    }

    @Override
    public void returnStatus(int[] id) {
        for (int i = 0; i < id.length; i++) {
            arrangecarDao.returnStatus(id[i]);
        }

    }

    @Override
    public void insertCompany(NoteCarTools noteCarTools) {
        arrangecarDao.insertCompany(noteCarTools);
    }
}

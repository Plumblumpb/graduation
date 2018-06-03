package com.ssm.module.basic.service.impl;

import com.ssm.module.basic.service.CombinedlistService;
import com.ssm.module.note.dao.CombinedlistDao;
import com.ssm.module.note.tool.NoteCarTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("combinedlistService")
public class CombinedlistServiceImpl implements CombinedlistService {
    @Autowired
    private CombinedlistDao combinedlistDao;

    @Override
    public List<NoteCarTools> getAll(Map<String, Object> map) {
        return combinedlistDao.getAll(map);
    }

    @Override
    public int save(NoteCarTools noteCarTools) {
        return combinedlistDao.save(noteCarTools);
    }

    @Override
    public int update(NoteCarTools noteCarTools) {
        return combinedlistDao.update(noteCarTools);
    }

    @Override
    public int delete(int[] id) {
        for (int i = 0; i < id.length; i++) {
            combinedlistDao.delete(id[i]);
        }
        return 1;
    }

    @Override
    public NoteCarTools selectOne(int id) {
        return combinedlistDao.selectOne(id);
    }

    @Override
    public List<NoteCarTools> selectBySelective(Map<String, Object> map) {
        return combinedlistDao.selectBySelective(map);
    }

    @Override
    public void updateStatus(int[] id) {
        for (int i = 0; i < id.length; i++) {
            combinedlistDao.updateStatus(id[i]);
        }
    }

    @Override
    public void updateStatusCombine(int[] id) {
        for (int i = 0; i < id.length; i++) {
            combinedlistDao.updateStatus(id[i]);
        }

    }
}

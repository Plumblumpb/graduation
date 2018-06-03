package com.ssm.module.basic.service.impl;

import com.ssm.module.basic.service.LoadcarService;
import com.ssm.module.note.dao.LoadcarDao;
import com.ssm.module.note.tool.NoteCarTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("loadcarService")
public class LoadcarServiceImpl implements LoadcarService {
    @Autowired
    private LoadcarDao loadcarDao;

    @Override
    public List<NoteCarTools> getAll(Map<String, Object> map) {
        return loadcarDao.getAll(map);
    }

    @Override
    public int delete(int[] id) {
        for (int i = 0; i < id.length; i++) {
            loadcarDao.delete(id[i]);
        }
        return 1;
    }

    @Override
    public NoteCarTools selectOne(int id) {
        return loadcarDao.selectOne(id);
    }

    @Override
    public List<NoteCarTools> selectBySelective(Map<String, Object> map) {
        return loadcarDao.selectBySelective(map);
    }

    @Override
    public void updateStatus(int[] id) {
        for (int i = 0; i < id.length; i++) {
            loadcarDao.updateStatus(id[i]);
        }
    }

    @Override
    public void insertOntime(NoteCarTools noteCarTools) {
        loadcarDao.insertOntime(noteCarTools);
    }

    @Override
    public void returnStatus(NoteCarTools noteCarTools) {

        loadcarDao.returnStatus(noteCarTools);

    }
}

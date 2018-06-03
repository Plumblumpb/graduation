package com.ssm.module.basic.service.impl;


import com.ssm.module.basic.service.NoteAllService;
import com.ssm.module.note.dao.NoteAllDao;
import com.ssm.module.note.tool.NoteCarTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("noteAllService")
public class NoteAllServiceImpl implements NoteAllService {
    @Autowired
    private NoteAllDao noteAllDao;

    @Override
    public List<NoteCarTools> getAll(Map<String, Object> map) {
        return noteAllDao.getAll(map);
    }

    @Override
    public int save(NoteCarTools noteCarTools) {
        return noteAllDao.save(noteCarTools);
    }

    @Override
    public int update(NoteCarTools noteCarTools) {
        return noteAllDao.update(noteCarTools);
    }

    @Override
    public int delete(int[] id) {
        for (int i = 0; i < id.length; i++) {
            noteAllDao.delete(id[i]);
        }
        return 1;
    }

    @Override
    public NoteCarTools selectOne(int id) {
        return noteAllDao.selectOne(id);
    }

    @Override
    public List<NoteCarTools> selectBySelective(Map<String, Object> map) {
        return noteAllDao.selectBySelective(map);
    }

    @Override
    public void updateStatus(int[] id) {
        for (int i = 0; i < id.length; i++) {
            noteAllDao.updateStatus(id[i]);
        }
    }
}

package com.ssm.module.basic.service.impl;

import com.ssm.module.basic.service.CarplanService;
import com.ssm.module.note.dao.CarplanDao;
import com.ssm.module.note.tool.NoteCarTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("carplanService")
public class CarplanServiceImpl implements CarplanService {
    @Autowired
    private CarplanDao carplanDao;

    @Override
    public List<NoteCarTools> getAll(Map<String, Object> map) {
        return carplanDao.getAll(map);
    }

    @Override
    public int save(NoteCarTools noteCarTools) {
        return carplanDao.save(noteCarTools);
    }

    @Override
    public int update(NoteCarTools noteCarTools) {
        return carplanDao.update(noteCarTools);
    }

    @Override
    public int delete(int[] id) {
        for (int i = 0; i < id.length; i++) {
            carplanDao.delete(id[i]);
        }
        return 1;
    }

    @Override
    public int delete(int id) {
        carplanDao.delete(id);
        return 1;
    }

    @Override
    public NoteCarTools selectOne(int id) {
        return carplanDao.selectOne(id);
    }

    @Override
    public List<NoteCarTools> selectBySelective(Map<String, Object> map) {
        return carplanDao.selectBySelective(map);
    }

    @Override
    public void updateStatus(int[] id) {
        for (int i = 0; i < id.length; i++) {
            carplanDao.updateStatus(id[i]);
        }
    }
}

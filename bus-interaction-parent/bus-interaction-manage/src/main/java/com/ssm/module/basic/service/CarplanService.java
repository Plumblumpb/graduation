package com.ssm.module.basic.service;

import com.ssm.module.note.tool.NoteCarTools;

import java.util.List;
import java.util.Map;

public interface CarplanService {
    List<NoteCarTools> getAll(Map<String, Object> map);

    int save(NoteCarTools noteCarTools);

    int update(NoteCarTools noteCarTools);

    int delete(int[] id);

    int delete(int id);
    NoteCarTools selectOne(int id);

    List<NoteCarTools> selectBySelective(Map<String, Object> map);

    void updateStatus(int[] id);
}

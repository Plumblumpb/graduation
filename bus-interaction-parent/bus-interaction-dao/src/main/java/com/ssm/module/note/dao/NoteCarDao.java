package com.ssm.module.note.dao;

import com.ssm.module.note.entity.NoteCar;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface NoteCarDao {


    int deleteByPrimaryKey(Integer noteid);

    int insert(NoteCar record);

    int insertSelective(NoteCar record);


    NoteCar selectByPrimaryKey(Integer noteid);


    int updateByPrimaryKeySelective(NoteCar record);

    int updateByPrimaryKey(NoteCar record);
}
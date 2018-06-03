package com.ssm.module.note.dao;


import java.util.List;

import com.ssm.module.note.entity.Place;
import org.apache.ibatis.annotations.Param;

public interface PlaceDao {


    int deleteByPrimaryKey(Integer placeId);

    int insert(Place record);

    int insertSelective(Place record);

    Place selectByPrimaryKey(Integer placeId);


    int updateByPrimaryKey(Place record);
}
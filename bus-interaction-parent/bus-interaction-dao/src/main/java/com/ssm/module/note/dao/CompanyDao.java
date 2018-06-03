package com.ssm.module.note.dao;

import com.ssm.module.note.entity.Company;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface CompanyDao {


    int deleteByPrimaryKey(Integer comid);

    int insert(Company record);

    int insertSelective(Company record);


    Company selectByPrimaryKey(Integer comid);

    int updateByPrimaryKeySelective(Company record);

    int updateByPrimaryKey(Company record);
}
package com.ssm.module.sys.dao;

import com.ssm.module.note.dao.CarplanDao;
import com.ssm.module.note.tool.NoteCarTools;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


public class CarPlan {
    private static CarplanDao carplanDao;

    @BeforeClass
    public static void init() {
        ApplicationContext
                context = new ClassPathXmlApplicationContext("bus-interaction-dao.xml");
        carplanDao = context.getBean(CarplanDao.class);

    }

    @Test
    public void save() {
        carplanDao.selectOne(1);
//        HashMap map = new HashMap();
//        String usernamePlan = "陈东";
//        map.put("usernamePlan","陈东");
//        carplanDao.selectBySelective(map);
    }

    @Test
    public void insert() {
        NoteCarTools noteCarTools = new NoteCarTools();
        noteCarTools.setNoteid(1);
        noteCarTools.setUsernamePlan("陈东");
        noteCarTools.setCarId("2");
        noteCarTools.setCarNumber(4);
        noteCarTools.setOriginId("2");
        noteCarTools.setDestinationId("4");
        noteCarTools.setStatus("11");
        noteCarTools.setUsernameReal("程东");
        carplanDao.update(noteCarTools);

    }

    @Test
    public void in() throws ParseException {
        //获得2010年9月13日22点36分01秒 的Date对象
        DateFormat dateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date myDate1 = dateFormat2.parse("2016-06-04 22:36:01");

        Date myDate2 = dateFormat2.parse("2016-06-16 22:36:01");


        NoteCarTools noteCarTools = new NoteCarTools();
        noteCarTools.setUsernamePlan("王肖尔");
        noteCarTools.setCarId("2");
        noteCarTools.setCarNumber(3);
        noteCarTools.setOriginId("5");
        noteCarTools.setDestinationId("1");
        noteCarTools.setTimePlan(myDate1);
        noteCarTools.setTimeReal(myDate2);
        noteCarTools.setUsernameReal("刘媛媛");
        noteCarTools.setStatus("51");
        noteCarTools.setCompanyId(1);
        noteCarTools.setTransportPlan(1);
        noteCarTools.setCompanyId(4);
        for (int i = 0; i < 5; i++) {
            noteCarTools.setTransportPlan(i + 2);
            carplanDao.save(noteCarTools);
        }

    }

    @Test
    public void intest() {
        NoteCarTools noteCarTools = new NoteCarTools();
        System.out.println();
        carplanDao.update(noteCarTools);
    }

}

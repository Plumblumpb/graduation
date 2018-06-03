package com.ssm.module.note.entity;

import java.util.Date;

public class NoteCar {

    private String remark;

    private String ontime;

    public String getOntime() {
        return ontime;
    }

    public void setOntime(String ontime) {
        this.ontime = ontime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    private Integer noteid;

    private String usernamePlan;

    private String carId;

    private Integer carNumber;

    private String originId;

    private String destinationId;

    private String status;

    private Integer transportPlan;

    private Integer transportReal;

    private Date begintime;

    private Date timePlan;

    private Date timeReal;

    private String usernameReal;

    public Integer getNoteid() {
        return noteid;
    }

    public void setNoteid(Integer noteid) {
        this.noteid = noteid;
    }

    public String getUsernamePlan() {
        return usernamePlan;
    }

    public void setUsernamePlan(String usernamePlan) {
        this.usernamePlan = usernamePlan == null ? null : usernamePlan.trim();
    }

    public String getCarId() {
        return carId;
    }

    public void setCarId(String carId) {
        this.carId = carId == null ? null : carId.trim();
    }

    public Integer getCarNumber() {
        return carNumber;
    }

    public void setCarNumber(Integer carNumber) {
        this.carNumber = carNumber;
    }

    public String getOriginId() {
        return originId;
    }

    public void setOriginId(String originId) {
        this.originId = originId == null ? null : originId.trim();
    }

    public String getDestinationId() {
        return destinationId;
    }

    public void setDestinationId(String destinationId) {
        this.destinationId = destinationId == null ? null : destinationId.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public Integer getTransportPlan() {
        return transportPlan;
    }

    public void setTransportPlan(Integer transportPlan) {
        this.transportPlan = transportPlan;
    }

    public Integer getTransportReal() {
        return transportReal;
    }

    public void setTransportReal(Integer transportReal) {
        this.transportReal = transportReal;
    }

    public Date getBegintime() {
        return begintime;
    }

    public void setBegintime(Date begintime) {
        this.begintime = begintime;
    }

    public Date getTimePlan() {
        return timePlan;
    }

    public void setTimePlan(Date timePlan) {
        this.timePlan = timePlan;
    }

    public Date getTimeReal() {
        return timeReal;
    }

    public void setTimeReal(Date timeReal) {
        this.timeReal = timeReal;
    }

    public String getUsernameReal() {
        return usernameReal;
    }

    public void setUsernameReal(String usernameReal) {
        this.usernameReal = usernameReal == null ? null : usernameReal.trim();
    }
}
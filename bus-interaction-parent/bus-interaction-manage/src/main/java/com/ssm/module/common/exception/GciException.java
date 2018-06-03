package com.ssm.module.common.exception;

import java.io.Serializable;

/**
 * @author TheOne
 * @create 2017-12-2017/12/19 14:46
 */
public class GciException extends RuntimeException implements Serializable {

    private static final long serialVersionUID = -2636570100582381774L;

    private String msg;
    private int code = 500;

    public GciException(String msg) {
        super(msg);
        this.msg = msg;
    }

    public GciException(String msg, Throwable e) {
        super(msg, e);
        this.msg = msg;
    }

    public GciException(String msg, int code) {
        super(msg);
        this.msg = msg;
        this.code = code;
    }

    public GciException(String msg, int code, Throwable e) {
        super(msg, e);
        this.msg = msg;
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}

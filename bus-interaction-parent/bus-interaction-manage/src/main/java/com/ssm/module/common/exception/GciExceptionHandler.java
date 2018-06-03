package com.ssm.module.common.exception;

import com.ssm.module.common.util.R;
import org.apache.shiro.authz.AuthorizationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author TheOne
 * @create 2017-12-2017/12/19 14:51
 */
@RestControllerAdvice
public class GciExceptionHandler {

    private static Logger LOGGER = LoggerFactory.getLogger(GciExceptionHandler.class);

    /**
     * 处理自定义异常
     */
    @ExceptionHandler(GciException.class)
    public R handleRRException(GciException e) {
        R r = new R();
        r.put("code", e.getCode());
        r.put("msg", e.getMessage());

        return r;
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public R handleDuplicateKeyException(DuplicateKeyException e) {
        LOGGER.error(e.getMessage(), e);
        return R.error("数据库中已存在该记录");
    }

    @ExceptionHandler(AuthorizationException.class)
    public R handleAuthorizationException(AuthorizationException e) {
        LOGGER.error(e.getMessage(), e);
        return R.error("没有权限，请联系管理员授权");
    }

    @ExceptionHandler(Exception.class)
    public R handleException(Exception e) {
        LOGGER.error(e.getMessage(), e);
        return R.error();
    }
}

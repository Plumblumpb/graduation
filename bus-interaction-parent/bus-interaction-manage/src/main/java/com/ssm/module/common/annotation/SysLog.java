package com.ssm.module.common.annotation;

import java.lang.annotation.*;

/**
 * @author TheOne
 * @create 2017-12-2017/12/19 14:30
 * 系统操作日志注解
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SysLog {

    /**
     * 操作名
     *
     * @return
     */
    String value() default "";
}

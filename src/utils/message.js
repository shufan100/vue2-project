export function msgSuccess(content,duration) {
    this.$notify.success({
        message: content?content:'(空)',
        duration:duration?duration:1000
    });
}

export function msgWarning(content,duration) {
    this.$notify.warning({
        message: content?content:'(空)',
        duration:duration?duration:1000
    });
}

export function msgInfo(content,duration) {
    this.$notify.info({
        message: content?content:'(空)',
        duration:duration?duration:1000
    });
}

export function msgError(content,duration) {
    this.$notify.error({
        message: content?content:'(空)',
        duration:duration?duration:1000
    });
}
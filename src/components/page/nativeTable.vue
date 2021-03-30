<template>
    <div id="nativeTable">
        <!-- 
            2. cellpadding 规定单元格与其内容之间的空白
            3.cellspacing   规定单元格之间的空白
            4.border-collapse: collapse;去掉这些空白的属性,如果不设置table标签的这些属性值为0，可以直接在样式里面设置border-collapse: collapse;也可以去掉这些空白的！ 
        -->
        <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
            <thead></thead>
            <tbody>
                <!-- 1 -->
                <tr>
                    <td colspan='4'>
                        企业名称：
                        <!-- <label for="name">企业名称：</label> -->
                    </td>
                    <td colspan='3'>
                        许昌许继低压电器有限公司
                        <!-- <span style="border-width: 0px; width: 100%; padding: 0px;">
                            许昌许继低压电器有限公司
                        </span> -->
                    </td>
                </tr>
                <!-- 2 -->
                <tr>
                    <td rowspan="4">
                        <label for="pccc">资质等级：</label>
                    </td>
                    <td colspan="3">
                        <span style="border-width: 0px; width: 100%; padding: 0px;">
                            <input type="text" autocomplete="off" placeholder="主项：电力承包总资质："  name="pccc" readonly="">
                        </span>
                    </td>
                    <td colspan="4">
                        <span  style="border-width: 0px;">
                            <input type="text" autocomplete="off" placeholder="增项（3）" >
                        </span>
                    </td>
                </tr>
                <!-- 3 -->
                <tr>
                    <td colspan="3">
                        <span  style="border-width: 0px;">
                            <input type="text" autocomplete="off" placeholder="增项（1）" name="realName" readonly="">
                        </span>
                    </td>
                    <td colspan="4">
                        <span style="border-width: 0px;">
                            <input type="text" autocomplete="off" placeholder="增项（4）" name="gender1" readonly="">
                        </span>
                    </td>

                </tr>
                <!-- 4 -->
                <tr>
                    <td colspan="3">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="realName1" style="border-width: 0px;"><span class="mini-textbox-border mini-corner-all"><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="增项（2）" id="realName1$text" name="realName1" readonly=""></span><input type="hidden"></span>
                    </td>
                    <td colspan="4">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="gender2" style="border-width: 0px;"><span class="mini-textbox-border mini-corner-all"><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="增项（5）" id="gender2$text" name="gender2" readonly=""></span><input type="hidden"></span>
                    </td>

                </tr>
                <!-- 5 -->
                <tr>
                    <td>承装资质：</td>
                    <td><input type="text" placeholder="" ></td>

                    <td>承装资质：</td>
                    <td><input type="text"  placeholder="" ></td>

                    <td>承装资质：</td>
                    <td><input type="text"  placeholder="" ></td>
                </tr>

                <!-- 6 -->
                <tr>
                    <td>
                        <label for="cuscc">统一社会信用代码：</label>
                    </td>
                    <td colspan="7">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="cuscc" style="border-width: 0px; width: 100%; padding: 0px;"></span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <label for="pcccn">电力总承包资质证书编号：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="pcccn" style="border-width: 0px;">
                            199345-32
                        </span>
                    </td>
                    <td colspan="2">
                        <label for="pccced">电力总承包资质有效期：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="pccced" style="border-width: 0px;">
                            2021-10-19
                        </span>
                    </td>

                </tr>
                <tr>
                    <td colspan="2">
                        <label for="pscn">安全许可证编号：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="pscn" style="border-width: 0px;">
                            2121
                        </span>
                    </td>

                    <td colspan="2">
                        <label for="psced">安全许可证有效期：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="psced" style="border-width: 0px;">
                            323232
                        </span>
                    </td>

                </tr>
                <tr>
                    <td colspan="2">
                        <label for="permissionNo">电力许可证编号：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="permissionNo" style="border-width: 0px;"></span>
                    </td>

                    <td colspan="2">
                        <label for="ced">电力资质有效期：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="ced" style="border-width: 0px;"></span>
                    </td>

                </tr>
                <tr>
                    <td colspan="2">
                        <label for="bln">营业执照号：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="bln" style="border-width: 0px;"></span>
                    </td>

                    <td colspan="2">
                        <label for="bled">营业执照有效期：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="bled" style="border-width: 0px;"></span>
                    </td>

                </tr>
                <tr>
                    <td colspan="2">
                        <label for="address">地址：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="address" style="border-width: 0px;"></span>
                    </td>

                    <td colspan="2">
                        <label for="postCode">邮编：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="postCode" style="border-width: 0px;"></span>
                    </td>

                </tr>
                <tr>
                    <td colspan="2">
                        <label for="businessEntity">企业法人姓名：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="businessEntity" style="border-width: 0px;"></span>
                    </td>

                    <td colspan="2">
                        <label for="businessEntityId">企业法人身份证号：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="businessEntityId" style="border-width: 0px;"></span>
                    </td>
                </tr>

                <tr>
                    <td colspan="2">
                        <label for="city">公司注册地：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="city" style="border-width: 0px;"></span>
                    </td>

                    <td colspan="2">
                        <label for="createTime">建档时间：</label>
                    </td>
                    <td colspan="2">
                        <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="createTime" style="border-width: 0px;"></span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="less"  >
#nativeTable{
    input{
        background: none;
    }
    tbody tr td {
        // border-left: 1px solid #B2C4C0;
        // border-bottom: 1px solid #B2C4C0;
        // border-right: 1px solid #B2C4C0;
        border: 1px solid #B2C4C0;
        text-align: left;
        padding-left: 12px;
        background-color: #fffff5;
       
    }
}
</style>
<template data-sly-template.display="${ @ url, enableParsys, contentAlign, contentVerticalAlign, customImageHeight}">
    <sly
        data-sly-use.cmpCtrl="com.asadventure.platform.component.general.responsiveimage.ResponsiveBackgroundController"
        data-sly-unwrap></sly>


    <div data-sly-test="${url}"
         data-sly-use.renditionCtrl="${'com.asadventure.platform.component.general.responsiveimage.RenditionController' @ url=url}"
         data-sly-unwrap>

        <div data-sly-use.ctrl="com.asadventure.general.component.CallToActionController" data-sly-unwrap></div>
        <div data-sly-use.contentCtrl="com.asadventure.general.component.ContentComponentController"
             data-sly-unwrap></div>
        <div class="responsive-image__title" data-sly-test="${cmpCtrl.displayTitlePlaceHolder}">
            <div data-sly-resource="${'title' @ resourceType='wcm/foundation/components/parsys'}"></div>
        </div>
        <a href="${cmpCtrl.blockLink @ extension='html'}">
            <div data-responsive-background="" data-alt="" style="height: ${customImageHeight @ context='styleToken'};">


                <div data-sly-list="${renditionCtrl.renditions}" data-sly-unwrap>
                    <div data-src="${item.link}" data-media-bg="(max-width: ${item.maxWidth}px)"></div>
                </div>
                <div data-src="${url}" data-media-bg="(min-width: 1px)"></div>

                <div data-sly-test="${enableParsys != false}"
                     data-sly-resource="${'contents' @ resourceType='wcm/foundation/components/parsys'}"
                     class="responsive-image__components responsive-image__components--align-vertical-${contentVerticalAlign} responsive-image__components--align-horizontal-${contentAlign} ${ contentCtrl.padding } ${ contentCtrl.border }">
                </div>


                <div class="call-to-actions responsive-image__components--align-horizontal-${contentAlign}"
                     data-sly-test="${cmpCtrl.hideDefaultButton}">
                    <div
                        data-sly-use.template="${'/apps/platform-asadventure/components/general/call-to-action-button/template.html'}"
                        data-sly-unwrap></div>
                    <div data-sly-call="${template.button @ Ctrlr=ctrl}"></div>
                </div>
            </div>
        </a>
    </div>

    <div data-sly-test="${wcmmode.edit}" class="responsive-image__image--default-height cq-dd-image"
         style="width:100%;display:block;font-weight:bold;color:#CECECE;border:solid 1px #CECECE">Drop image here
    </div>
</template>
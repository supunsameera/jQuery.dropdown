(function($) {
    $.fn.dropDownList = function(options) {
    		var defaults={
			textColor:'#cecece',
			disabledBorder:'none'
		},
		options=$.extend(defaults,options);

        return this.each(function() {

            var $dropdownSelect = $(this);
            $dropdownSelect.wrap('<div class="dropdownWrapper"/>');

            $dropdownSelect.hide();
            var $dropdownWrapper = $dropdownSelect.parent('.dropdownWrapper');
            var $dropdownSelectOptions = $dropdownSelect.children('option');
            var dropdownTitle = '';
            var dropdownItems = '';
            var dropDownContent = '';
            var isoptiondisabled='';
            var isselectdisabled='';
            $dropdownSelectOptions.each(function(index, option) {

                if (option.selected) {
                    dropdownTitle = option.text;
                }
                if(option.disabled){
                	isoptiondisabled='isoptiondisabled';
                }
                if($dropdownSelect.prop('disabled')==true){
                	isselectdisabled='isselectdisabled';
                	$dropdownSelect.parent('.dropdownWrapper').css({
                		'border':options.disabledBorder
                	});
                }
                dropdownItems += '<li class="dropDownListItemli' +isoptiondisabled  +'">' + option.text + '</li>';

            });
            dropDownContent = '<a class="dropDownTitle"><span class="dropDownTitleText">' + dropdownTitle + '</span><span class="glyphicon glyphicon-triangle-bottom"></span></a><ul class="dropdownItemsWrapperul '+isselectdisabled+'">' + dropdownItems + '</ul>';
            $dropdownWrapper.append(dropDownContent);



            $dropdownWrapper.on('click', '.dropDownTitle', function(e) {
                if (!$dropdownWrapper.hasClass('isselectdisabled')) {

                    $dropdownWrapper.find('.active').removeClass('active');

                    e.stopPropagation();
                    var dropdownWidth = $(this).parents(".dropdownWrapper").width();
                    $(this).next(".dropdownItemsWrapperul").css('width', dropdownWidth + 'px');

                    $dropdownWrapper.toggleClass('active');
                    $('.dropdownWrapper').each(function() {
                        if ($(this)[0] !== $dropdownWrapper[0]) {
                            $(this).removeClass('active');
                        }
                    });

                    $(document).bind("click.dropdown", function() {
                        $dropdownWrapper.removeClass('active');
                        $(document).unbind('click.dropdown');
                    });
                }
            });


            $dropdownWrapper.on('click', '.dropDownListItemli', function() {
                if (!$dropdownWrapper.hasClass('isselectdisabled')) {

                    $(this).siblings('.dropDownListItemli').removeClass('isselected');
                    $(this).addClass('isselected');
                    $(this).parents().siblings('.dropDownTitle').html($(this).text());

                    var selectedItemText = $(this).text();
                    $dropdownSelect.find("option").each(function(key, value) {
                        if (value.text === selectedItemText) {
                            $(this).prop('selected', true);
                        } else {
                            $(this).prop('selected', false);
                        }
                    });
                    $dropdownSelect.change();
                }
            });

        });
    };
})(jQuery);

export default function () {
	var $blogBtn = $('.blog__button');
	$blogBtn.on('mouseenter', function () {
		$(this).parent().parent().find('.blog__image').addClass('blog__image--hovered');
	});
	$blogBtn.on('mouseleave', function () {
		$(this).parent().parent().find('.blog__image').removeClass('blog__image--hovered');
	});
}
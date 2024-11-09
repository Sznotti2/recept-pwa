import { Injectable } from '@angular/core';
import { Blog } from '../interfaces/blog';

@Injectable({
	providedIn: 'root'
})
export class BlogService {

	private blogList: Blog[] = [
		{
			id: 1,
			title: 'My first blog',
			description: 'Blog description 1',
			createdAt: new Date("2023-08-23T15:30:00"),
			image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.over-blog.com%2Fr3gYfnzGC4tyFQYsj2YdwjwFoek%3D%2F1000x288%2Fsmart%2Ffilters%3Ano_upscale()%2Fhttps%253A%252F%252Fassets.over-blog.com%252Ft%252Ftwentyeleven%252Fimages%252Fpine-cone.jpg&f=1&nofb=1&ipt=c824dcb2a2e96d18cce4bc4f46d47c7a4d218b01bad7eb512ab77762267f3f32&ipo=images",
			paragraphs: [
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec sagittis massa. Ut blandit sem quis velit volutpat, in interdum neque viverra. Ut eleifend auctor massa, eget mollis urna congue et. In tincidunt, enim quis iaculis gravida, ligula ipsum congue augue, quis mollis lacus ante ultrices lectus. Ut fermentum, felis id ornare finibus, sem ligula consectetur tortor, nec vulputate lacus velit sit amet ante. Ut commodo ac turpis sed imperdiet. Maecenas tempor eleifend mi, vel aliquet purus ullamcorper et. Quisque metus risus, mattis et consectetur a, facilisis in eros. Duis posuere neque semper erat porta ornare. Quisque mattis, elit ut euismod vehicula, eros eros tincidunt massa, a vestibulum augue augue ac tellus. Donec tristique tortor in purus consectetur malesuada. Donec maximus placerat purus, ut placerat dolor dictum ut. Ut sit amet semper metus, ac posuere lectus. Suspendisse vehicula nisi sem, eu feugiat orci blandit eget. Fusce gravida diam velit, ac molestie augue condimentum id. Duis mattis tincidunt lacinia. ",
				"Sed tincidunt, neque sit amet aliquam mollis, mauris mauris tempus ipsum, ac ultricies justo eros tristique elit. Aenean est mi, gravida sed hendrerit at, mattis vitae ligula. Mauris vitae risus urna. Integer at tellus ut lorem posuere vulputate nec sit amet purus. Nunc purus nunc, dictum et tristique sit amet, dignissim ut orci. Donec libero est, dictum at blandit sed, vehicula non velit. Mauris vel volutpat nibh. Duis enim leo, maximus sed cursus sit amet, pharetra et leo. Phasellus et fermentum tortor, vitae semper est. Fusce porta ex ac erat rutrum, quis ultrices eros eleifend. Donec sit amet ex eget tellus lacinia tempus ut in felis. Praesent sodales leo sed justo viverra, at auctor nulla tincidunt. Nulla volutpat eleifend ex, sit amet mattis magna luctus rutrum. ",
				"Pellentesque fringilla, turpis vel ullamcorper placerat, ex metus varius libero, pellentesque varius arcu augue in neque. Suspendisse potenti. Donec a eros suscipit, molestie orci non, fringilla libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse euismod dictum nisl vel faucibus. Praesent euismod ut ante a tempus. Nunc sed lorem purus. Aliquam erat volutpat. Quisque leo turpis, molestie quis magna in, vehicula lobortis leo. Proin facilisis orci ut mattis viverra. Proin aliquet quam et sapien condimentum accumsan. Sed venenatis mattis diam, in ultricies urna rhoncus eget. Sed justo nisl, vestibulum eu vehicula non, ultrices vel dolor. Sed iaculis justo at erat ultricies, quis facilisis ex gravida. ",
				"Donec sit amet ex in sapien pretium semper id eget augue. Fusce sit amet turpis ornare, feugiat ex tincidunt, vestibulum purus. Quisque nisi mauris, sodales ut ipsum sit amet, rutrum gravida orci. Vivamus blandit auctor ipsum, eget pellentesque augue malesuada vel. Sed euismod facilisis quam, at efficitur augue dictum ut. Proin aliquam velit in est ultrices, a laoreet orci posuere. Etiam ullamcorper vel sapien at sollicitudin. Proin lacinia dolor sed egestas mattis. Ut sit amet metus a tellus vestibulum vulputate. Integer sed enim nisl. Curabitur fermentum augue quis neque imperdiet, a rhoncus sem tempus. Nunc suscipit pulvinar lectus non tempus. Fusce posuere tempor tincidunt. Quisque neque tellus, vestibulum ut leo ac, cursus eleifend ligula. Duis scelerisque neque nunc, non eleifend leo egestas ac. ",
				"Fusce ut dui porta, facilisis ligula aliquet, pulvinar diam. Proin posuere ipsum ultrices gravida tempus. Ut neque dui, consectetur ut commodo ac, gravida a felis. Integer vitae dui lectus. Vivamus pulvinar porttitor mattis. Mauris eget urna dictum augue varius maximus. Nulla id nulla sit amet lectus tempus consequat sit amet eget diam. Morbi vulputate diam felis, dictum lacinia purus maximus consectetur. Curabitur imperdiet sodales tristique. Mauris ornare, eros vel lacinia mollis, quam metus aliquam neque, vel gravida neque lorem sed nulla. Integer malesuada tempus dignissim. Cras hendrerit, lacus nec mattis volutpat, eros metus pulvinar nisi, a eleifend nulla eros eu lacus. Fusce laoreet orci metus, eu semper purus posuere sit amet. "
			]
		},
		{
			id: 2,
			title: 'A legelső Blogbejegyzésem',
			description: 'Blog description 1',
			createdAt: new Date("2023-09-30T15:30:00"),
			image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.tmecosys.com%2Fimage%2Fupload%2Ft_web767x639%2Fimg%2Frecipe%2Fras%2FAssets%2F715280D2-DB83-48A8-AD0D-D0584B7DB062%2FDerivates%2Fec822162-d723-410d-bb80-cf306f3a788c.jpg&f=1&nofb=1&ipt=160ac7a240ee241766727bf0600f542cf31ddabcec3bb17b43c77237bf7897bb&ipo=images",
			paragraphs: [
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec sagittis massa. Ut blandit sem quis velit volutpat, in interdum neque viverra. Ut eleifend auctor massa, eget mollis urna congue et. In tincidunt, enim quis iaculis gravida, ligula ipsum congue augue, quis mollis lacus ante ultrices lectus. Ut fermentum, felis id ornare finibus, sem ligula consectetur tortor, nec vulputate lacus velit sit amet ante. Ut commodo ac turpis sed imperdiet. Maecenas tempor eleifend mi, vel aliquet purus ullamcorper et. Quisque metus risus, mattis et consectetur a, facilisis in eros. Duis posuere neque semper erat porta ornare. Quisque mattis, elit ut euismod vehicula, eros eros tincidunt massa, a vestibulum augue augue ac tellus. Donec tristique tortor in purus consectetur malesuada. Donec maximus placerat purus, ut placerat dolor dictum ut. Ut sit amet semper metus, ac posuere lectus. Suspendisse vehicula nisi sem, eu feugiat orci blandit eget. Fusce gravida diam velit, ac molestie augue condimentum id. Duis mattis tincidunt lacinia. ",
				"Sed tincidunt, neque sit amet aliquam mollis, mauris mauris tempus ipsum, ac ultricies justo eros tristique elit. Aenean est mi, gravida sed hendrerit at, mattis vitae ligula. Mauris vitae risus urna. Integer at tellus ut lorem posuere vulputate nec sit amet purus. Nunc purus nunc, dictum et tristique sit amet, dignissim ut orci. Donec libero est, dictum at blandit sed, vehicula non velit. Mauris vel volutpat nibh. Duis enim leo, maximus sed cursus sit amet, pharetra et leo. Phasellus et fermentum tortor, vitae semper est. Fusce porta ex ac erat rutrum, quis ultrices eros eleifend. Donec sit amet ex eget tellus lacinia tempus ut in felis. Praesent sodales leo sed justo viverra, at auctor nulla tincidunt. Nulla volutpat eleifend ex, sit amet mattis magna luctus rutrum. ",
				"Pellentesque fringilla, turpis vel ullamcorper placerat, ex metus varius libero, pellentesque varius arcu augue in neque. Suspendisse potenti. Donec a eros suscipit, molestie orci non, fringilla libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse euismod dictum nisl vel faucibus. Praesent euismod ut ante a tempus. Nunc sed lorem purus. Aliquam erat volutpat. Quisque leo turpis, molestie quis magna in, vehicula lobortis leo. Proin facilisis orci ut mattis viverra. Proin aliquet quam et sapien condimentum accumsan. Sed venenatis mattis diam, in ultricies urna rhoncus eget. Sed justo nisl, vestibulum eu vehicula non, ultrices vel dolor. Sed iaculis justo at erat ultricies, quis facilisis ex gravida. ",
				"Donec sit amet ex in sapien pretium semper id eget augue. Fusce sit amet turpis ornare, feugiat ex tincidunt, vestibulum purus. Quisque nisi mauris, sodales ut ipsum sit amet, rutrum gravida orci. Vivamus blandit auctor ipsum, eget pellentesque augue malesuada vel. Sed euismod facilisis quam, at efficitur augue dictum ut. Proin aliquam velit in est ultrices, a laoreet orci posuere. Etiam ullamcorper vel sapien at sollicitudin. Proin lacinia dolor sed egestas mattis. Ut sit amet metus a tellus vestibulum vulputate. Integer sed enim nisl. Curabitur fermentum augue quis neque imperdiet, a rhoncus sem tempus. Nunc suscipit pulvinar lectus non tempus. Fusce posuere tempor tincidunt. Quisque neque tellus, vestibulum ut leo ac, cursus eleifend ligula. Duis scelerisque neque nunc, non eleifend leo egestas ac. ",
				"Fusce ut dui porta, facilisis ligula aliquet, pulvinar diam. Proin posuere ipsum ultrices gravida tempus. Ut neque dui, consectetur ut commodo ac, gravida a felis. Integer vitae dui lectus. Vivamus pulvinar porttitor mattis. Mauris eget urna dictum augue varius maximus. Nulla id nulla sit amet lectus tempus consequat sit amet eget diam. Morbi vulputate diam felis, dictum lacinia purus maximus consectetur. Curabitur imperdiet sodales tristique. Mauris ornare, eros vel lacinia mollis, quam metus aliquam neque, vel gravida neque lorem sed nulla. Integer malesuada tempus dignissim. Cras hendrerit, lacus nec mattis volutpat, eros metus pulvinar nisi, a eleifend nulla eros eu lacus. Fusce laoreet orci metus, eu semper purus posuere sit amet. "
			]
		},
		{
			id: 3,
			title: 'Blogot mindenkinek',
			description: 'Blog description 1',
			createdAt: new Date("2023-10-07T15:30:00"),
			image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fantiquearchaeology.com%2Fcdn%2Fshop%2Farticles%2Fantique-archaeology-blog-desktop-hero.png%3Fv%3D1727676950%26width%3D2800&f=1&nofb=1&ipt=67cfeb1ce414b47aacba2379a1a454932a82b70c1e6ffb48ac59be195237eb31&ipo=images",
			paragraphs: [
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec sagittis massa. Ut blandit sem quis velit volutpat, in interdum neque viverra. Ut eleifend auctor massa, eget mollis urna congue et. In tincidunt, enim quis iaculis gravida, ligula ipsum congue augue, quis mollis lacus ante ultrices lectus. Ut fermentum, felis id ornare finibus, sem ligula consectetur tortor, nec vulputate lacus velit sit amet ante. Ut commodo ac turpis sed imperdiet. Maecenas tempor eleifend mi, vel aliquet purus ullamcorper et. Quisque metus risus, mattis et consectetur a, facilisis in eros. Duis posuere neque semper erat porta ornare. Quisque mattis, elit ut euismod vehicula, eros eros tincidunt massa, a vestibulum augue augue ac tellus. Donec tristique tortor in purus consectetur malesuada. Donec maximus placerat purus, ut placerat dolor dictum ut. Ut sit amet semper metus, ac posuere lectus. Suspendisse vehicula nisi sem, eu feugiat orci blandit eget. Fusce gravida diam velit, ac molestie augue condimentum id. Duis mattis tincidunt lacinia. ",
				"Sed tincidunt, neque sit amet aliquam mollis, mauris mauris tempus ipsum, ac ultricies justo eros tristique elit. Aenean est mi, gravida sed hendrerit at, mattis vitae ligula. Mauris vitae risus urna. Integer at tellus ut lorem posuere vulputate nec sit amet purus. Nunc purus nunc, dictum et tristique sit amet, dignissim ut orci. Donec libero est, dictum at blandit sed, vehicula non velit. Mauris vel volutpat nibh. Duis enim leo, maximus sed cursus sit amet, pharetra et leo. Phasellus et fermentum tortor, vitae semper est. Fusce porta ex ac erat rutrum, quis ultrices eros eleifend. Donec sit amet ex eget tellus lacinia tempus ut in felis. Praesent sodales leo sed justo viverra, at auctor nulla tincidunt. Nulla volutpat eleifend ex, sit amet mattis magna luctus rutrum. ",
				"Pellentesque fringilla, turpis vel ullamcorper placerat, ex metus varius libero, pellentesque varius arcu augue in neque. Suspendisse potenti. Donec a eros suscipit, molestie orci non, fringilla libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse euismod dictum nisl vel faucibus. Praesent euismod ut ante a tempus. Nunc sed lorem purus. Aliquam erat volutpat. Quisque leo turpis, molestie quis magna in, vehicula lobortis leo. Proin facilisis orci ut mattis viverra. Proin aliquet quam et sapien condimentum accumsan. Sed venenatis mattis diam, in ultricies urna rhoncus eget. Sed justo nisl, vestibulum eu vehicula non, ultrices vel dolor. Sed iaculis justo at erat ultricies, quis facilisis ex gravida. ",
				"Donec sit amet ex in sapien pretium semper id eget augue. Fusce sit amet turpis ornare, feugiat ex tincidunt, vestibulum purus. Quisque nisi mauris, sodales ut ipsum sit amet, rutrum gravida orci. Vivamus blandit auctor ipsum, eget pellentesque augue malesuada vel. Sed euismod facilisis quam, at efficitur augue dictum ut. Proin aliquam velit in est ultrices, a laoreet orci posuere. Etiam ullamcorper vel sapien at sollicitudin. Proin lacinia dolor sed egestas mattis. Ut sit amet metus a tellus vestibulum vulputate. Integer sed enim nisl. Curabitur fermentum augue quis neque imperdiet, a rhoncus sem tempus. Nunc suscipit pulvinar lectus non tempus. Fusce posuere tempor tincidunt. Quisque neque tellus, vestibulum ut leo ac, cursus eleifend ligula. Duis scelerisque neque nunc, non eleifend leo egestas ac. ",
				"Fusce ut dui porta, facilisis ligula aliquet, pulvinar diam. Proin posuere ipsum ultrices gravida tempus. Ut neque dui, consectetur ut commodo ac, gravida a felis. Integer vitae dui lectus. Vivamus pulvinar porttitor mattis. Mauris eget urna dictum augue varius maximus. Nulla id nulla sit amet lectus tempus consequat sit amet eget diam. Morbi vulputate diam felis, dictum lacinia purus maximus consectetur. Curabitur imperdiet sodales tristique. Mauris ornare, eros vel lacinia mollis, quam metus aliquam neque, vel gravida neque lorem sed nulla. Integer malesuada tempus dignissim. Cras hendrerit, lacus nec mattis volutpat, eros metus pulvinar nisi, a eleifend nulla eros eu lacus. Fusce laoreet orci metus, eu semper purus posuere sit amet. "
			]
		},
		{
			id: 4,
			title: 'De la Recherche',
			description: 'Blog description 1',
			createdAt: new Date("2023-10-18T15:30:00"),
			image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsugargeekshow.com%2Fwp-content%2Fuploads%2F2020%2F10%2Fbaked_donut_recipe_featured.jpg&f=1&nofb=1&ipt=9624637458bd2596e4742327317fca32b6abe025015b5a6bd78318455037c199&ipo=images",
			paragraphs: [
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec sagittis massa. Ut blandit sem quis velit volutpat, in interdum neque viverra. Ut eleifend auctor massa, eget mollis urna congue et. In tincidunt, enim quis iaculis gravida, ligula ipsum congue augue, quis mollis lacus ante ultrices lectus. Ut fermentum, felis id ornare finibus, sem ligula consectetur tortor, nec vulputate lacus velit sit amet ante. Ut commodo ac turpis sed imperdiet. Maecenas tempor eleifend mi, vel aliquet purus ullamcorper et. Quisque metus risus, mattis et consectetur a, facilisis in eros. Duis posuere neque semper erat porta ornare. Quisque mattis, elit ut euismod vehicula, eros eros tincidunt massa, a vestibulum augue augue ac tellus. Donec tristique tortor in purus consectetur malesuada. Donec maximus placerat purus, ut placerat dolor dictum ut. Ut sit amet semper metus, ac posuere lectus. Suspendisse vehicula nisi sem, eu feugiat orci blandit eget. Fusce gravida diam velit, ac molestie augue condimentum id. Duis mattis tincidunt lacinia. ",
				"Sed tincidunt, neque sit amet aliquam mollis, mauris mauris tempus ipsum, ac ultricies justo eros tristique elit. Aenean est mi, gravida sed hendrerit at, mattis vitae ligula. Mauris vitae risus urna. Integer at tellus ut lorem posuere vulputate nec sit amet purus. Nunc purus nunc, dictum et tristique sit amet, dignissim ut orci. Donec libero est, dictum at blandit sed, vehicula non velit. Mauris vel volutpat nibh. Duis enim leo, maximus sed cursus sit amet, pharetra et leo. Phasellus et fermentum tortor, vitae semper est. Fusce porta ex ac erat rutrum, quis ultrices eros eleifend. Donec sit amet ex eget tellus lacinia tempus ut in felis. Praesent sodales leo sed justo viverra, at auctor nulla tincidunt. Nulla volutpat eleifend ex, sit amet mattis magna luctus rutrum. ",
				"Pellentesque fringilla, turpis vel ullamcorper placerat, ex metus varius libero, pellentesque varius arcu augue in neque. Suspendisse potenti. Donec a eros suscipit, molestie orci non, fringilla libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse euismod dictum nisl vel faucibus. Praesent euismod ut ante a tempus. Nunc sed lorem purus. Aliquam erat volutpat. Quisque leo turpis, molestie quis magna in, vehicula lobortis leo. Proin facilisis orci ut mattis viverra. Proin aliquet quam et sapien condimentum accumsan. Sed venenatis mattis diam, in ultricies urna rhoncus eget. Sed justo nisl, vestibulum eu vehicula non, ultrices vel dolor. Sed iaculis justo at erat ultricies, quis facilisis ex gravida. ",
				"Donec sit amet ex in sapien pretium semper id eget augue. Fusce sit amet turpis ornare, feugiat ex tincidunt, vestibulum purus. Quisque nisi mauris, sodales ut ipsum sit amet, rutrum gravida orci. Vivamus blandit auctor ipsum, eget pellentesque augue malesuada vel. Sed euismod facilisis quam, at efficitur augue dictum ut. Proin aliquam velit in est ultrices, a laoreet orci posuere. Etiam ullamcorper vel sapien at sollicitudin. Proin lacinia dolor sed egestas mattis. Ut sit amet metus a tellus vestibulum vulputate. Integer sed enim nisl. Curabitur fermentum augue quis neque imperdiet, a rhoncus sem tempus. Nunc suscipit pulvinar lectus non tempus. Fusce posuere tempor tincidunt. Quisque neque tellus, vestibulum ut leo ac, cursus eleifend ligula. Duis scelerisque neque nunc, non eleifend leo egestas ac. ",
				"Fusce ut dui porta, facilisis ligula aliquet, pulvinar diam. Proin posuere ipsum ultrices gravida tempus. Ut neque dui, consectetur ut commodo ac, gravida a felis. Integer vitae dui lectus. Vivamus pulvinar porttitor mattis. Mauris eget urna dictum augue varius maximus. Nulla id nulla sit amet lectus tempus consequat sit amet eget diam. Morbi vulputate diam felis, dictum lacinia purus maximus consectetur. Curabitur imperdiet sodales tristique. Mauris ornare, eros vel lacinia mollis, quam metus aliquam neque, vel gravida neque lorem sed nulla. Integer malesuada tempus dignissim. Cras hendrerit, lacus nec mattis volutpat, eros metus pulvinar nisi, a eleifend nulla eros eu lacus. Fusce laoreet orci metus, eu semper purus posuere sit amet. "
			]
		},
		{
			id: 5,
			title: 'Ezt még folytatjuk',
			description: 'Blog description 1',
			createdAt: new Date("2023-10-20T15:30:00"),
			image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnatashaskitchen.com%2Fwp-content%2Fuploads%2F2019%2F02%2FBreakfast-Muffins-5.jpg&f=1&nofb=1&ipt=3085ba478770985d586af07533ac2cea25685e0a36615deb8589a99f1d32c244&ipo=images",
			paragraphs: [
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec sagittis massa. Ut blandit sem quis velit volutpat, in interdum neque viverra. Ut eleifend auctor massa, eget mollis urna congue et. In tincidunt, enim quis iaculis gravida, ligula ipsum congue augue, quis mollis lacus ante ultrices lectus. Ut fermentum, felis id ornare finibus, sem ligula consectetur tortor, nec vulputate lacus velit sit amet ante. Ut commodo ac turpis sed imperdiet. Maecenas tempor eleifend mi, vel aliquet purus ullamcorper et. Quisque metus risus, mattis et consectetur a, facilisis in eros. Duis posuere neque semper erat porta ornare. Quisque mattis, elit ut euismod vehicula, eros eros tincidunt massa, a vestibulum augue augue ac tellus. Donec tristique tortor in purus consectetur malesuada. Donec maximus placerat purus, ut placerat dolor dictum ut. Ut sit amet semper metus, ac posuere lectus. Suspendisse vehicula nisi sem, eu feugiat orci blandit eget. Fusce gravida diam velit, ac molestie augue condimentum id. Duis mattis tincidunt lacinia. ",
				"Sed tincidunt, neque sit amet aliquam mollis, mauris mauris tempus ipsum, ac ultricies justo eros tristique elit. Aenean est mi, gravida sed hendrerit at, mattis vitae ligula. Mauris vitae risus urna. Integer at tellus ut lorem posuere vulputate nec sit amet purus. Nunc purus nunc, dictum et tristique sit amet, dignissim ut orci. Donec libero est, dictum at blandit sed, vehicula non velit. Mauris vel volutpat nibh. Duis enim leo, maximus sed cursus sit amet, pharetra et leo. Phasellus et fermentum tortor, vitae semper est. Fusce porta ex ac erat rutrum, quis ultrices eros eleifend. Donec sit amet ex eget tellus lacinia tempus ut in felis. Praesent sodales leo sed justo viverra, at auctor nulla tincidunt. Nulla volutpat eleifend ex, sit amet mattis magna luctus rutrum. ",
				"Pellentesque fringilla, turpis vel ullamcorper placerat, ex metus varius libero, pellentesque varius arcu augue in neque. Suspendisse potenti. Donec a eros suscipit, molestie orci non, fringilla libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse euismod dictum nisl vel faucibus. Praesent euismod ut ante a tempus. Nunc sed lorem purus. Aliquam erat volutpat. Quisque leo turpis, molestie quis magna in, vehicula lobortis leo. Proin facilisis orci ut mattis viverra. Proin aliquet quam et sapien condimentum accumsan. Sed venenatis mattis diam, in ultricies urna rhoncus eget. Sed justo nisl, vestibulum eu vehicula non, ultrices vel dolor. Sed iaculis justo at erat ultricies, quis facilisis ex gravida. ",
				"Donec sit amet ex in sapien pretium semper id eget augue. Fusce sit amet turpis ornare, feugiat ex tincidunt, vestibulum purus. Quisque nisi mauris, sodales ut ipsum sit amet, rutrum gravida orci. Vivamus blandit auctor ipsum, eget pellentesque augue malesuada vel. Sed euismod facilisis quam, at efficitur augue dictum ut. Proin aliquam velit in est ultrices, a laoreet orci posuere. Etiam ullamcorper vel sapien at sollicitudin. Proin lacinia dolor sed egestas mattis. Ut sit amet metus a tellus vestibulum vulputate. Integer sed enim nisl. Curabitur fermentum augue quis neque imperdiet, a rhoncus sem tempus. Nunc suscipit pulvinar lectus non tempus. Fusce posuere tempor tincidunt. Quisque neque tellus, vestibulum ut leo ac, cursus eleifend ligula. Duis scelerisque neque nunc, non eleifend leo egestas ac. ",
				"Fusce ut dui porta, facilisis ligula aliquet, pulvinar diam. Proin posuere ipsum ultrices gravida tempus. Ut neque dui, consectetur ut commodo ac, gravida a felis. Integer vitae dui lectus. Vivamus pulvinar porttitor mattis. Mauris eget urna dictum augue varius maximus. Nulla id nulla sit amet lectus tempus consequat sit amet eget diam. Morbi vulputate diam felis, dictum lacinia purus maximus consectetur. Curabitur imperdiet sodales tristique. Mauris ornare, eros vel lacinia mollis, quam metus aliquam neque, vel gravida neque lorem sed nulla. Integer malesuada tempus dignissim. Cras hendrerit, lacus nec mattis volutpat, eros metus pulvinar nisi, a eleifend nulla eros eu lacus. Fusce laoreet orci metus, eu semper purus posuere sit amet. "
			]
		},
		{
			id: 6,
			title: 'Good blog',
			description: 'Blog description 1',
			createdAt: new Date("2023-10-23T15:30:00"),
			image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmartushazikonyhaja.hu%2Fwp-content%2Fuploads%2F2020%2F12%2Fpogacsa-2048x1162.jpg&f=1&nofb=1&ipt=8249d00d52f089dfd24f8dd1f97db70550316810e05dd68861632e5f5fa04b40&ipo=images",
			paragraphs: [
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec sagittis massa. Ut blandit sem quis velit volutpat, in interdum neque viverra. Ut eleifend auctor massa, eget mollis urna congue et. In tincidunt, enim quis iaculis gravida, ligula ipsum congue augue, quis mollis lacus ante ultrices lectus. Ut fermentum, felis id ornare finibus, sem ligula consectetur tortor, nec vulputate lacus velit sit amet ante. Ut commodo ac turpis sed imperdiet. Maecenas tempor eleifend mi, vel aliquet purus ullamcorper et. Quisque metus risus, mattis et consectetur a, facilisis in eros. Duis posuere neque semper erat porta ornare. Quisque mattis, elit ut euismod vehicula, eros eros tincidunt massa, a vestibulum augue augue ac tellus. Donec tristique tortor in purus consectetur malesuada. Donec maximus placerat purus, ut placerat dolor dictum ut. Ut sit amet semper metus, ac posuere lectus. Suspendisse vehicula nisi sem, eu feugiat orci blandit eget. Fusce gravida diam velit, ac molestie augue condimentum id. Duis mattis tincidunt lacinia. ",
				"Sed tincidunt, neque sit amet aliquam mollis, mauris mauris tempus ipsum, ac ultricies justo eros tristique elit. Aenean est mi, gravida sed hendrerit at, mattis vitae ligula. Mauris vitae risus urna. Integer at tellus ut lorem posuere vulputate nec sit amet purus. Nunc purus nunc, dictum et tristique sit amet, dignissim ut orci. Donec libero est, dictum at blandit sed, vehicula non velit. Mauris vel volutpat nibh. Duis enim leo, maximus sed cursus sit amet, pharetra et leo. Phasellus et fermentum tortor, vitae semper est. Fusce porta ex ac erat rutrum, quis ultrices eros eleifend. Donec sit amet ex eget tellus lacinia tempus ut in felis. Praesent sodales leo sed justo viverra, at auctor nulla tincidunt. Nulla volutpat eleifend ex, sit amet mattis magna luctus rutrum. ",
				"Pellentesque fringilla, turpis vel ullamcorper placerat, ex metus varius libero, pellentesque varius arcu augue in neque. Suspendisse potenti. Donec a eros suscipit, molestie orci non, fringilla libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse euismod dictum nisl vel faucibus. Praesent euismod ut ante a tempus. Nunc sed lorem purus. Aliquam erat volutpat. Quisque leo turpis, molestie quis magna in, vehicula lobortis leo. Proin facilisis orci ut mattis viverra. Proin aliquet quam et sapien condimentum accumsan. Sed venenatis mattis diam, in ultricies urna rhoncus eget. Sed justo nisl, vestibulum eu vehicula non, ultrices vel dolor. Sed iaculis justo at erat ultricies, quis facilisis ex gravida. ",
				"Donec sit amet ex in sapien pretium semper id eget augue. Fusce sit amet turpis ornare, feugiat ex tincidunt, vestibulum purus. Quisque nisi mauris, sodales ut ipsum sit amet, rutrum gravida orci. Vivamus blandit auctor ipsum, eget pellentesque augue malesuada vel. Sed euismod facilisis quam, at efficitur augue dictum ut. Proin aliquam velit in est ultrices, a laoreet orci posuere. Etiam ullamcorper vel sapien at sollicitudin. Proin lacinia dolor sed egestas mattis. Ut sit amet metus a tellus vestibulum vulputate. Integer sed enim nisl. Curabitur fermentum augue quis neque imperdiet, a rhoncus sem tempus. Nunc suscipit pulvinar lectus non tempus. Fusce posuere tempor tincidunt. Quisque neque tellus, vestibulum ut leo ac, cursus eleifend ligula. Duis scelerisque neque nunc, non eleifend leo egestas ac. ",
				"Fusce ut dui porta, facilisis ligula aliquet, pulvinar diam. Proin posuere ipsum ultrices gravida tempus. Ut neque dui, consectetur ut commodo ac, gravida a felis. Integer vitae dui lectus. Vivamus pulvinar porttitor mattis. Mauris eget urna dictum augue varius maximus. Nulla id nulla sit amet lectus tempus consequat sit amet eget diam. Morbi vulputate diam felis, dictum lacinia purus maximus consectetur. Curabitur imperdiet sodales tristique. Mauris ornare, eros vel lacinia mollis, quam metus aliquam neque, vel gravida neque lorem sed nulla. Integer malesuada tempus dignissim. Cras hendrerit, lacus nec mattis volutpat, eros metus pulvinar nisi, a eleifend nulla eros eu lacus. Fusce laoreet orci metus, eu semper purus posuere sit amet. "
			]
		}
	];



	getAllBlogs(): Blog[] {    
		return this.blogList;  
	}  

	getBlogById(id: number): Blog | undefined {    
		return this.blogList.find((blog) => 
			blog.id === id
		);
	}


	sortBlogsByName(blogs : Blog[], descending : boolean = false): Blog[] {
		return blogs.sort((a, b) => {
			const comparison = a.title.localeCompare(b.title);
			return descending ? comparison * -1 : comparison
		});
	}

	sortBlogsByDate(blogs : Blog[], descending : boolean = false): Blog[] {
		return blogs.sort((a, b) => {
			const comparison = b.createdAt.getTime() - a.createdAt.getTime();
			return descending ? comparison * -1 : comparison
		});
	}

	constructor() { }
}
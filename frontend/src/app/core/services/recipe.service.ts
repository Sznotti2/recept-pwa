import { inject, Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';
import { catchError, Observable, pipe, map } from 'rxjs';
import { RecipeFirebaseService } from './recipe-firebase.service';
import { OfflineRecipeDbService } from './offline-recipe-db.service';

@Injectable({
	providedIn: 'root'
})
export class RecipeService {
	recipeFireBaseService = inject(RecipeFirebaseService);
	offlineRecipeDbService = inject(OfflineRecipeDbService);
	// recipesSig = signal<Recipe[]>([]);
	recipe$ = Observable<Recipe[]>;

	private recipeList: Recipe[] = [
		{
			id: "wasd1",
			name: "Csak egy teszt, nincs itt semmi látnivaló. Én más vagyok imnt a többiek.",
			description: "Modi necessitatibus itaque aliquam repellat assumenda vitae. Ipsam hic eos voluptatem aliquam qui labore dolorum cupiditate. Minus nostrum aut facilis dolores ut voluptas nemo. Sint id ut explicabo. Libero tempore adipisci earum sint quia. Et officiis perferendis veniam rerum maxime.",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=uwu",
			categories: ["1", "2", "3", "4", "5", "6", "7"],
			timeToMake: 60,
			rating: 3.2,
			servings: 2,
			isFavorite: false,
			ingredients: [
				{ title: "a tetejére", ingredientList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"] },
			],
			instructions: [
				{ text: "Sütsd meg a vajat, majd háladózjuk a csokit", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=007"] },
			],
		},
		{
			id: "wasd2",
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			timeToMake: 60,
			rating: 4.6,
			servings: 8,
			isFavorite: false,
			ingredients: [
				{ title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"] },
				{ title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"] },
				{ title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"] },
			],
			instructions: [
				{ text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük" },
				{ text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük." },
				{ text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett" },
				{ text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz." },
				{ text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem." },
				{ text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz." },
				{ text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"] },
				{ text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"] },
				{ text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!" },
				{ text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!" }
			],
		},
		{
			id: "wasd3",
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			timeToMake: 60,
			rating: 4.6,
			servings: 8,
			isFavorite: false,
			ingredients: [
				{ title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"] },
				{ title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"] },
				{ title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"] },
			],
			instructions: [
				{ text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük" },
				{ text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük." },
				{ text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett" },
				{ text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz." },
				{ text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem." },
				{ text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz." },
				{ text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"] },
				{ text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"] },
				{ text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!" },
				{ text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!" }
			],
		},
		{
			id: "wasd4",
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			timeToMake: 60,
			rating: 4.6,
			servings: 8,
			isFavorite: false,
			ingredients: [
				{ title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"] },
				{ title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"] },
				{ title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"] },
			],
			instructions: [
				{ text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük" },
				{ text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük." },
				{ text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett" },
				{ text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz." },
				{ text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem." },
				{ text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz." },
				{ text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"] },
				{ text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"] },
				{ text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!" },
				{ text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!" }
			],
		},
		{
			id: "wasd5",
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			timeToMake: 60,
			rating: 4.6,
			servings: 8,
			isFavorite: false,
			ingredients: [
				{ title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"] },
				{ title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"] },
				{ title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"] },
			],
			instructions: [
				{ text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük" },
				{ text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük." },
				{ text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett" },
				{ text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz." },
				{ text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem." },
				{ text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz." },
				{ text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"] },
				{ text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"] },
				{ text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!" },
				{ text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!" }
			],
		},
		{
			id: "wasd6",
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			timeToMake: 60,
			rating: 4.6,
			servings: 8,
			isFavorite: false,
			ingredients: [
				{ title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"] },
				{ title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"] },
				{ title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"] },
			],
			instructions: [
				{ text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük" },
				{ text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük." },
				{ text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett" },
				{ text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz." },
				{ text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem." },
				{ text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz." },
				{ text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"] },
				{ text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"] },
				{ text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!" },
				{ text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!" }
			],
		},
		{
			id: "wasd7",
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			timeToMake: 60,
			rating: 4.6,
			servings: 8,
			isFavorite: false,
			ingredients: [
				{ title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"] },
				{ title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"] },
				{ title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"] },
			],
			instructions: [
				{ text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük" },
				{ text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük." },
				{ text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett" },
				{ text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz." },
				{ text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem." },
				{ text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz." },
				{ text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"] },
				{ text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"] },
				{ text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!" },
				{ text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!" }
			],
		},
		{
			id: "wasd8",
			name: "Egyszerű tripla csoki mousse torta - sütés nélkül Oreoval",
			description: "Erre a tortára végre én is büszke vagyok, mert a kinézete olyan, hogy ha egy cukrászdát nyitnék, akkor oda merném tenni a pultba, nem csak az íze, hanem a külleme miatt is. Ez nekem eddig még nem igazán jött össze, ezért most nagyon örülök! 🙂",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye",
			categories: ["Könnyű", "Őszi", "Galzúr", "Magyar"],
			timeToMake: 60,
			rating: 4.6,
			servings: 8,
			isFavorite: false,
			ingredients: [
				{ title: "A kekszes alaphoz", ingredientList: ["200 g Oreo keksz", "10 dkg vaj"] },
				{ title: " csokoládés rétegekhez", ingredientList: ["másfél tábla étcsoki (150 g)", "másfél tábla tejcsoki (150 g)", "másfél tábla fehér csoki (150 g)", "3*fél bögre (3*120) g 35%-os habtejszín", "3* háromnegyed bögre (3*160 g) 35%-os habtejszín", "3 teáskanál (3*4 g) zselatin"] },
				{ title: "A tetejére", ingredientList: ["kevés csokiforgács a háromféle csokiból", "egy szem Oreo keksz"] },
			],
			instructions: [
				{ text: "Az Oreo kekszet késes aprítóban összedaráljuk, majd az olvasztott vajat is beledolgozzuk (a géppel is lehet).", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Kapcsos tortaforma aljába simítjuk a masszát, és hűtőbe tesszük" },
				{ text: "Egy pici edénykében vagy kávékiöntőbe kimérünk egy evőkanál és egy teáskanál hideg vizet, majd egy teásjanálnyi zselatint keverünk bele, majd félretesszük." },
				{ text: "Az étcsokit fél bögre tejszínnel felolvasztjuk gőzfürdő felett" },
				{ text: "A zselatint közepes hőfokon addig melegítjük, míg fel nem hígul egy picit, majd hozzákeverjük a csokihoz." },
				{ text: "A csokit hagyjuk kicsit kihűlni, olyan majdnem szoba hőmérsékletűre. Közben néha átkevertem." },
				{ text: "A tejszínt habbá verjük, majd hozzákeverjük a csokihoz." },
				{ text: "Ráöntjük a kekszes alapra, majd hűtőbe tesszük húsz percre, hogy megkössön egy picit.", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003"] },
				{ text: "Ez idő alatt elkészítjük a tejcsokis réteget, pontosan ugyanúgy, mint az étcsokisat csináltuk, csak ugyanezt tejcsokival, majd az egész kis procedúrát megismételjük a fehérrel is 🙂", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye"] },
				{ text: "Néhány órára hűtőbe tesszük, hogy dermedjen, de a legjobb, ha egy egész éjszakát bent hagyjuk. Tegyünk egy tányért a forma tetejére, hogy ne vegye át a hűtőben az ízeket!", images: ["https://via.placeholder.com/600/000000/FFFFFF/?text=torta helye", "https://via.placeholder.com/600/000000/FFFFFF/?text=002", "https://via.placeholder.com/600/000000/FFFFFF/?text=003", "https://via.placeholder.com/600/000000/FFFFFF/?text=004", "https://via.placeholder.com/600/000000/FFFFFF/?text=005"] },
				{ text: "Másnap egy éles pengéjű és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyűrős!" },
				{ text: "Egy félbevágott Oreo-val és csokiforgáccsal díszítjük, vagy amivel csak szeretnétek, a lényeg, hogy hajazzon a csokira 🙂 Nagyon jól passzol mellé valami friss gyümölcs!" }
			],
		},

	]

	addRecipe(
		name: string,
		description: string,
		image: string,
		categories: string[],
		timeToMake: number,
		servings: number,
		ingredients: {
			title: string;
			ingredientList: string[]
		}[],
		instructions: {
			text: string;
			images?: string[];
		}[]): void {
		const newRecipe: Recipe = {
			id: new Date().getTime().toString(),
			name,
			description,
			image,
			categories,
			timeToMake,
			rating: 0,
			servings,
			isFavorite: false,
			ingredients,
			instructions,
		};


		if (navigator.onLine) {
			this.recipeFireBaseService.addRecipe2(newRecipe).subscribe({
				next: () => {
					this.offlineRecipeDbService.saveRecipe(newRecipe); // Save offline as well
				},
				error: (err) => {
					console.error('Error adding recipe to Firebase:', err);
					this.offlineRecipeDbService.saveRecipe(newRecipe); // Save offline if Firebase fails
				}
			});
		} else {
			this.offlineRecipeDbService.saveRecipe(newRecipe);
		}
	}

	// getAllRecipes(): Recipe[] {
	// 	return this.recipeList;
	// }

	// getRecipeById(id: string): Recipe | undefined {
	// 	return this.recipeList.find((recipe) =>
	// 		recipe.id === id
	// 	);
	// }

	/**
   * Ha online vagyunk, akkor a firestoreból kérjük le a boxokat, ha viszont nem akkor az indexedDB-ből.
   */
	getRecipes(): Observable<Recipe[]> {
		if (navigator.onLine) {
			return this.recipeFireBaseService.getRecipes().pipe(
				// TODO elmenteni az indexedDB-be, hogy offline is el legyen tárolva
				catchError(() => this.offlineRecipeDbService.getRecipes())
			);
		} else {
			return this.offlineRecipeDbService.getRecipes();
		}
	}

	getRecipeById(id: string): Observable<Recipe | undefined> {
		if (navigator.onLine) {
			return this.recipeFireBaseService.getRecipeById(id);
		} else {
			return this.offlineRecipeDbService.getRecipeById(id);
		}
	}


	saveFavoriteRecipesToIndexedDb(): void {
		this.getRecipes().subscribe((recipes) => {
			const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);
			favoriteRecipes.forEach(recipe => {
				this.offlineRecipeDbService.saveRecipe(recipe);
			});
		});
	}

	public filterRecipiesByName(searchTerm: string): Observable<Recipe[]> {
		return this.getRecipes().pipe(
			map(recipes => recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase())))
		);
	}

	/**
	 * Ha online online állapotba ér az alkalmazás a nem szinkronizált boxokat elmentjük a firestore-ba is,
	 * majd jelezzük, hogy a box listát újra le kell kérni.
	 */
	// private setupOfflineSync(): void {
	// 	window.addEventListener('online', () => {
	// 		this.syncUnsyncedBoxes().subscribe(() => this.boxesChanged$.next());
	// 	});
	// }

	/*
	 * Lekérjük a nem szinkronizált boxokat, azokat elmentjük a firestore-ba,
	 * és az indexedDB-ben is frissítjük az boxot, hogy már szinkronizálva van.
	 */
	// private syncUnsyncedBoxes(): Observable<any> {
	// 	return this.offlineBoxStoreService
	// 		.getUnsyncedBoxes()
	// 		.pipe(
	// 			switchMap((unsyncedBoxes) =>
	// 				forkJoin(
	// 					unsyncedBoxes.map((unsyncedBox) =>
	// 						this.boxFireStoreService
	// 							.saveBox(unsyncedBox)
	// 							.pipe(
	// 								tap(() => this.offlineBoxStoreService.updateBox(unsyncedBox))
	// 							)
	// 					)
	// 				)
	// 			)
	// 		);
	// }

}

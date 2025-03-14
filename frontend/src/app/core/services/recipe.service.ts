import { inject, Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';
import { catchError, Observable, pipe, map } from 'rxjs';
import { OfflineRecipeDbService } from './offline-recipe-db.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:5000/api/recipe';
@Injectable({
	providedIn: 'root'
})
export class RecipeService {
	http = inject(HttpClient);

	offlineRecipeDbService = inject(OfflineRecipeDbService);
	// recipesSig = signal<Recipe[]>([]);
	// recipe$ = Observable<Recipe[]>;

	recipeList: Recipe[] = [
		{
			id: "wasd1",
			name: "Csak egy teszt, nincs itt semmi látnivaló. Én más vagyok imnt a többiek.",
			description: "Modi necessitatibus itaque aliquam repellat assumenda vitae. Ipsam hic eos voluptatem aliquam qui labore dolorum cupiditate. Minus nostrum aut facilis dolores ut voluptas nemo. Sint id ut explicabo. Libero tempore adipisci earum sint quia. Et officiis perferendis veniam rerum maxime.",
			image: "https://via.placeholder.com/600/000000/FFFFFF/?text=uwu",
			categories: ["1", "2", "3", "4", "5", "6", "7"],
			timeToMake: 60,
			rating: 3.2,
			servings: 2,
			difficulty: "easy",
			slug: "csak-egy-teszt",
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
			difficulty: "hard",
			slug: "tripla-csoki-mousse-torta",
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
			difficulty: "medium",
			slug: "tripla-csoki-mousse-torta",
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
			difficulty: "medium",
			slug: "tripla-csoki-mousse-torta",
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
			difficulty: "hard",
			slug: "sütés-nélkül-oreoval",
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
			difficulty: "medium",
			slug: "sütés-nélkül-oreoval",
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
			difficulty: "easy",
			slug: "sütés-nélkül-oreoval",
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
			difficulty: "easy",
			slug: "sütés-nélkül-oreoval",
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

	addRecipe(recipe: Recipe): Observable<any> {
		return this.http.post(
			API_URL + "/",
			{ 
				"name": recipe.name,
				"description": recipe.description,
				"image": recipe.image,
				"timeToMake": recipe.timeToMake,
				"servings": recipe.servings,
				"difficulty": recipe.difficulty,
				"slug": recipe.slug,
				"categories": recipe.categories,
				"ingredients": recipe.ingredients,
				"instructions": recipe.instructions,
			},
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		);
	}

	getRecipes(): Observable<any> {
		return this.http.get(
			API_URL + "/",
			{}
		);
	}

	getRecipeBySlug(slug: string): Observable<Recipe> {
		return this.http.get<Recipe>(
			API_URL + "/" + slug,
			{}
		);
	}

	getFavoriteRecipes(): Observable<any> {
		return this.http.get(
			API_URL + "/favs",
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		);
	}

	editRecipe(recipe: Recipe, id: number): Observable<any> {
		return this.http.put(
			API_URL + "/" + id,
			{
				"name": recipe.name,
				"description": recipe.description,
				"image": recipe.image,
				"timeToMake": recipe.timeToMake,
				"servings": recipe.servings,
				"difficulty": recipe.difficulty,
				"slug": recipe.slug,
				"categories": recipe.categories,
				"ingredients": recipe.ingredients,
				"instructions": recipe.instructions,
			},
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		);
	}

	deleteRecipe(id: string): Observable<any> {
		return this.http.delete(
			API_URL + "/" + id,
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
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

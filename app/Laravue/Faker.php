<?php
/**
 * File Faker.php
 *
 * @author Tuan Duong <bacduong@gmail.com>
 * @package Laravue
 * @version 1.0
 */
namespace App\Laravue;

/**
 * Class Faker
 * Simple util to fake data
 *
 * @package Laravue
 */
final class Faker
{
    /**
     * Return random string with $length
     *
     * @param int $length
     * @return string
     */
    public static function randomString(int $length = 0): string
    {
        if ($length === 0) {
            $length = mt_rand(10, 100);
        }

        $characters = ' 0123456789 abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($index = 0; $index < $length; $index++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomString;
    }

    /**
     * @return \DateTime
     */
    public static function randomDateTime(): \DateTime
    {
        $dateTime = new \DateTime();
        $randomHours = mt_rand(0, 1000);
        $dateTime->modify(sprintf('-%s hours', $randomHours));

        return $dateTime;
    }

    /**
     * @param array $array
     * @return mixed
     */
    public static function randomInArray($array)
    {
        return $array[array_rand($array)];
    }

    /**
     * @return bool
     */
    public static function randomBoolean(): bool
    {
        return (bool) mt_rand(0, 1);
    }
}
